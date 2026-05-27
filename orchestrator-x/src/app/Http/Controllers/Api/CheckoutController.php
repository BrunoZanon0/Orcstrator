<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\Company;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class CheckoutController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
    }

    public function createCheckoutSession(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'billing_cycle' => 'required|in:monthly,yearly'
        ]);

        $user = Auth::user();
        $plan = Plan::find($request->plan_id);
        
        // Se não tem empresa, cria uma
        if (!$user->company_id) {
            $company = Company::create([
                'name' => $user->name . "'s Company",
                'slug' => strtolower(str_replace(' ', '-', $user->name)) . '-company',
                'email' => $user->email
            ]);
            $user->company_id = $company->id;
            $user->role = 'owner';
            $user->save();
        }

        $price = $request->billing_cycle === 'monthly' 
            ? $plan->price_monthly 
            : $plan->price_yearly;

        if ($price <= 0) {
            // Plano gratuito
            Subscription::create([
                'company_id' => $user->company_id,
                'plan_id' => $plan->id,
                'status' => 'active',
                'starts_at' => now(),
                'ends_at' => $plan->tier === 0 ? null : now()->addMonth()
            ]);
            return response()->json(['url' => '/dashboard']);
        }

        $checkout = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $plan->name . ' Plan - ' . ucfirst($request->billing_cycle),
                        'description' => $plan->description,
                    ],
                    'unit_amount' => $price * 100,
                    'recurring' => [
                        'interval' => $request->billing_cycle === 'monthly' ? 'month' : 'year',
                    ],
                ],
                'quantity' => 1,
            ]],
            'mode' => 'subscription',
            'success_url' => env('FRONTEND_URL', 'http://localhost:3000') . '/dashboard?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => env('FRONTEND_URL', 'http://localhost:3000') . '/pricing',
            'metadata' => [
                'user_id' => $user->id,
                'company_id' => $user->company_id,
                'plan_id' => $plan->id
            ]
        ]);

        return response()->json(['url' => $checkout->url]);
    }

    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, env('STRIPE_WEBHOOK_SECRET')
            );
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $this->handleSuccessfulSubscription($session);
                break;
            
            case 'customer.subscription.deleted':
                $subscription = $event->data->object;
                $this->handleCancelledSubscription($subscription);
                break;
        }

        return response()->json(['status' => 'success']);
    }

    private function handleSuccessfulSubscription($session)
    {
        $metadata = $session->metadata;
        
        Subscription::create([
            'company_id' => $metadata->company_id,
            'plan_id' => $metadata->plan_id,
            'status' => 'active',
            'starts_at' => now(),
            'ends_at' => null,
            'stripe_id' => $session->subscription,
            'payment_method' => 'stripe'
        ]);
    }

    private function handleCancelledSubscription($subscription)
    {
        $dbSubscription = Subscription::where('stripe_id', $subscription->id)->first();
        if ($dbSubscription) {
            $dbSubscription->update([
                'status' => 'cancelled',
                'cancelled_at' => now()
            ]);
        }
    }
}

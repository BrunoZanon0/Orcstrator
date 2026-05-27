'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

const plans = [
  {
    id: 1,
    name: 'Free',
    price: 0,
    priceLabel: 'Free forever',
    description: 'Perfect for startups',
    features: [
      'API Gateway',
      '60 requests/min',
      '5 routes',
      '3 API keys',
      '3 team members',
      '7 days logs',
      'Email support'
    ]
  },
  {
    id: 2,
    name: 'Pro',
    price: 49,
    priceLabel: 'per month',
    description: 'For growing businesses',
    features: [
      'Everything in Free',
      '600 requests/min',
      '50 routes',
      '20 API keys',
      '20 team members',
      '30 days logs',
      'Priority support',
      'Webhooks',
      'Rate limiting',
      'Custom domains'
    ],
    popular: true
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 299,
    priceLabel: 'per month',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      '10,000 requests/min',
      '1,000 routes',
      '100 API keys',
      '100 team members',
      '90 days logs',
      '24/7 phone support',
      'SLA guarantee',
      'Dedicated support',
      'On-premise option'
    ]
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSubscribe = async (planId: number, price: number) => {
    if (price === 0) {
      // Plano gratuito - redirecionar direto
      window.location.href = '/dashboard';
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/checkout/create-session', {
        plan_id: planId,
        billing_cycle: billingCycle
      });
      
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Error starting checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.name === 'Free') return 0;
    if (billingCycle === 'yearly' && plan.name === 'Pro') return 490;
    if (billingCycle === 'yearly' && plan.name === 'Enterprise') return 2990;
    return plan.price;
  };

  const getPriceLabel = (plan: typeof plans[0]) => {
    if (plan.name === 'Free') return 'Free forever';
    if (billingCycle === 'yearly') return 'per year';
    return plan.priceLabel;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Orchestrator X</h1>
          <div className="flex gap-4">
            <a href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</a>
            <a href="/pricing" className="text-blue-400">Pricing</a>
            {user ? (
              <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="text-red-400">
                Logout
              </button>
            ) : (
              <a href="/" className="text-gray-300 hover:text-white">Login</a>
            )}
          </div>
        </div>
      </div>

      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h1>
        <p className="text-xl text-gray-400">Choose the plan that's right for you</p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            billingCycle === 'monthly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle('yearly')}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            billingCycle === 'yearly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Yearly
          <span className="ml-2 text-xs text-green-400">Save 20%</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800 rounded-2xl border ${
                plan.popular ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-gray-700'
              } p-8`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">${getPrice(plan)}</span>
                <span className="text-gray-400"> / {getPriceLabel(plan)}</span>
              </div>
              
              <button
                onClick={() => handleSubscribe(plan.id, getPrice(plan))}
                disabled={loading}
                className={`w-full py-2 rounded-lg text-white font-medium mb-6 ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : plan.name === 'Free'
                    ? 'bg-gray-600 hover:bg-gray-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                } disabled:opacity-50`}
              >
                {plan.name === 'Free' ? 'Get Started' : 
                 plan.name === 'Pro' ? 'Start Pro Trial' : 'Contact Sales'}
              </button>
              
              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

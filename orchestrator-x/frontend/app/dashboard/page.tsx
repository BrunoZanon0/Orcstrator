'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      router.push('/');
    } else {
      try {
        setUser(JSON.parse(userData || '{}'));
      } catch (e) {
        setUser({ name: 'User' });
      }
    }
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Orchestrator X</h1>
          <div className="flex gap-4 items-center">
            <Link href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white">Pricing</Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">{user.name}</span>
            <button
              onClick={() => {
                localStorage.clear();
                router.push('/');
              }}
              className="text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-gray-400 mb-8">Welcome back, {user.name}!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Total Requests</p>
            <p className="text-2xl font-bold text-white mt-2">12,847</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Active Routes</p>
            <p className="text-2xl font-bold text-white mt-2">24</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Avg Latency</p>
            <p className="text-2xl font-bold text-white mt-2">47ms</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Uptime</p>
            <p className="text-2xl font-bold text-white mt-2">99.95%</p>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">All systems operational</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-500">Gateway URL: http://localhost:8000</p>
            <p className="text-sm text-gray-500 mt-1">Environment: Production</p>
          </div>
        </div>

        {/* Upgrade Banner */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-blue-500/30">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Upgrade your plan</h3>
              <p className="text-gray-400 mt-1">Get more requests, routes, and premium features</p>
            </div>
            <Link 
              href="/pricing" 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

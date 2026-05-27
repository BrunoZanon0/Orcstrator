'use client';

import { Globe, Shield, Zap, Clock } from 'lucide-react';

const routes = [
  { path: '/api/v1/users', method: 'GET', hits: 12543, avgLatency: 32, status: 'healthy' },
  { path: '/api/v1/auth', method: 'POST', hits: 8921, avgLatency: 45, status: 'healthy' },
  { path: '/api/v1/orders', method: 'GET', hits: 5432, avgLatency: 78, status: 'degraded' },
  { path: '/api/v1/products', method: 'GET', hits: 4321, avgLatency: 23, status: 'healthy' },
  { path: '/api/v1/payments', method: 'POST', hits: 2109, avgLatency: 156, status: 'slow' },
];

const statusColors = {
  healthy: 'text-green-500 bg-green-500/10',
  degraded: 'text-yellow-500 bg-yellow-500/10',
  slow: 'text-orange-500 bg-orange-500/10',
  down: 'text-red-500 bg-red-500/10',
};

export default function ActiveRoutes() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Routes</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Top 5 most accessed endpoints</p>
          </div>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View all →
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
              <th className="px-6 py-3 font-medium">Endpoint</th>
              <th className="px-6 py-3 font-medium">Method</th>
              <th className="px-6 py-3 font-medium">Hits</th>
              <th className="px-6 py-3 font-medium">Latency</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {routes.map((route, i) => (
              <tr key={i} className="text-sm">
                <td className="px-6 py-4 font-mono text-xs text-gray-700 dark:text-gray-300">
                  {route.path}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    route.method === 'GET' ? 'bg-green-500/10 text-green-500' :
                    route.method === 'POST' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {route.method}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {route.hits.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {route.avgLatency} ms
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[route.status as keyof typeof statusColors]}`}>
                    {route.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Activity, 
  Gauge, 
  Clock, 
  AlertTriangle,
  LayoutDashboard,
  Route,
  Database,
  Settings,
  LogOut,
  BarChart3,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';
import RequestsChart from '@/components/dashboard/RequestsChart';
import LatencyChart from '@/components/dashboard/LatencyChart';
import ActiveRoutes from '@/components/dashboard/ActiveRoutes';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      router.push('/');
    } else if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const metrics = [
    { title: 'Requests/min', value: '2,847', icon: Activity, trend: { value: 12, isPositive: true }, color: 'blue' as const },
    { title: 'Uptime', value: '99.95%', icon: Gauge, trend: { value: 0.05, isPositive: true }, color: 'green' as const },
    { title: 'Latency (avg)', value: '47ms', icon: Clock, trend: { value: 8, isPositive: false }, color: 'yellow' as const },
    { title: 'Error Rate', value: '0.23%', icon: AlertTriangle, trend: { value: 2, isPositive: false }, color: 'red' as const },
    { title: 'Active Routes', value: '24', icon: Route, color: 'purple' as const },
    { title: 'Queue Jobs', value: '156', icon: Database, color: 'blue' as const },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">Orchestrator X</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">API Gateway Platform</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Route size={18} />
              <span>Routes</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <BarChart3 size={18} />
              <span>Metrics</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Database size={18} />
              <span>Queue Monitor</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Shield size={18} />
              <span>API Keys</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings size={18} />
              <span>Settings</span>
            </a>
          </nav>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut size={16} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {user.name}! Here's what's happening with your API gateway.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {metrics.map((metric, i) => (
            <MetricCard key={i} {...metric} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RequestsChart />
          <LatencyChart />
        </div>

        {/* Active Routes Table */}
        <ActiveRoutes />
      </main>
    </div>
  );
}

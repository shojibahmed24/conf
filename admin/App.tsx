import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Settings, Bell, Users, MessageSquare } from 'lucide-react';

type AdminView = 'dashboard' | 'content' | 'notifications' | 'settings';

const AdminApp: React.FC = () => {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
            N
          </div>
          <span className="text-xl font-bold text-slate-900">Noor Deen Admin</span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeView === 'dashboard'} 
            onClick={() => setActiveView('dashboard')} 
          />
          <NavItem 
            icon={<BookOpen size={20} />} 
            label="Content Management" 
            active={activeView === 'content'} 
            onClick={() => setActiveView('content')} 
          />
          <NavItem 
            icon={<Bell size={20} />} 
            label="Notifications" 
            active={activeView === 'notifications'} 
            onClick={() => setActiveView('notifications')} 
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="App Settings" 
            active={activeView === 'settings'} 
            onClick={() => setActiveView('settings')} 
          />
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="text-sm">
              <div className="font-medium text-slate-900">Admin User</div>
              <div className="text-slate-500 text-xs">Super Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeView} Overview</h1>
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              Ramadan Mode: OFF
            </div>
          </div>
        </header>

        {activeView === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Total Users" value="12,450" change="+12%" icon={<Users size={20} />} />
              <StatCard title="Active Today" value="3,210" change="+5%" icon={<MessageSquare size={20} />} />
              <StatCard title="Hadiths Added" value="850" change="0%" icon={<BookOpen size={20} />} />
            </div>

            <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Content Updates</h2>
              <div className="text-slate-400 text-sm italic">No recent updates to display.</div>
            </div>
          </>
        )}

        {activeView !== 'dashboard' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="text-slate-400 mb-2">This module is under development.</div>
            <div className="text-slate-300 text-sm">Managing {activeView} will be available soon.</div>
          </div>
        )}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`}
  >
    {icon}
    {label}
  </button>
);

const StatCard = ({ title, value, change, icon }: { title: string, value: string, change: string, icon: any }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200">
    <div className="flex justify-between items-start mb-4">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="p-2 bg-slate-50 rounded-lg text-slate-400">{icon}</div>
    </div>
    <div className="text-3xl font-bold text-slate-900">{value}</div>
    <div className="text-xs text-emerald-600 mt-2 font-medium">{change} from last month</div>
  </div>
);

export default AdminApp;
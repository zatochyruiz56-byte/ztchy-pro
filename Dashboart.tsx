
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Activity, 
  Shield, 
  Cpu, 
  Zap,
  ChevronRight,
  Database
} from 'lucide-react';

interface DashboardProps {
  email: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ email, onLogout }) => {
  return (
    <div className="flex h-screen bg-[#05070a] text-gray-300">
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-r border-white/5 flex flex-col p-4">
        <div className="mb-10 p-2">
          <h1 className="text-xl font-orbitron font-bold text-cyan-400 neon-text">ZATOCHY PRO</h1>
          <p className="text-[10px] text-gray-500 tracking-[0.2em]">OS v2.4.0-STABLE</p>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="DASHBOARD" active />
          <NavItem icon={<Users size={20} />} label="NETWORK" />
          <NavItem icon={<Activity size={20} />} label="ANALYTICS" />
          <NavItem icon={<Database size={20} />} label="STORAGE" />
          <NavItem icon={<Shield size={20} />} label="SECURITY" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
          <NavItem icon={<Settings size={20} />} label="CONFIG" />
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all rounded-lg"
          >
            <LogOut size={20} />
            <span className="text-xs font-semibold tracking-widest">LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-orbitron font-bold text-white flex items-center gap-3">
              SYSTEM OVERVIEW <Zap className="text-yellow-400 fill-yellow-400/20" />
            </h2>
            <p className="text-gray-500 text-sm">Welcome back, operative <span className="text-cyan-400">{email}</span></p>
          </div>
          <div className="flex items-center gap-4 bg-black/40 border border-white/10 p-2 px-4 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <span className="text-xs font-orbitron text-gray-400">CORE ONLINE</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<Cpu className="text-cyan-400" />} title="CPU LOAD" value="24.8%" color="cyan" />
          <StatCard icon={<Zap className="text-purple-400" />} title="ENERGY" value="0.4 kWh" color="purple" />
          <StatCard icon={<Users className="text-blue-400" />} title="SESSIONS" value="12" color="blue" />
          <StatCard icon={<Shield className="text-emerald-400" />} title="THREATS" value="0" color="emerald" />
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-orbitron mb-6 flex items-center gap-2">
              <Activity size={18} className="text-cyan-400" /> RECENT NEURAL TELEMETRY
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <Cpu size={20} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Kernel update v{i}.0.{i*2}</p>
                      <p className="text-xs text-gray-500">Security patch deployed successfully</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-500 font-orbitron">T-minus {i*10}m</span>
                    <ChevronRight size={16} className="text-gray-700 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-lg font-orbitron mb-6">SECURITY MATRIX</h3>
            <div className="flex flex-col items-center justify-center py-10 space-y-6">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-cyan-500/20 animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Shield size={60} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-orbitron font-black text-white">98.2%</p>
                <p className="text-xs text-cyan-500 tracking-widest uppercase font-bold">Integrity Level</p>
              </div>
              <button className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-xs font-orbitron rounded-full hover:bg-cyan-500/20 transition-all">
                RUN DIAGNOSTIC
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button className={`flex items-center gap-3 px-4 py-3 w-full text-left transition-all rounded-lg group ${
    active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'
  }`}>
    <div className={`${active ? 'text-cyan-400' : 'group-hover:text-cyan-400'} transition-colors`}>
      {icon}
    </div>
    <span className="text-xs font-semibold tracking-widest">{label}</span>
  </button>
);

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
  <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
    <div className="flex items-center gap-4 mb-2">
      <div className={`p-2 rounded-lg bg-${color}-500/10`}>
        {icon}
      </div>
      <h4 className="text-[10px] tracking-widest text-gray-500 font-bold uppercase">{title}</h4>
    </div>
    <div className="text-2xl font-orbitron font-bold text-white mb-1">{value}</div>
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full bg-cyan-500 w-[70%] shadow-[0_0_10px_rgba(0,243,255,0.5)]`}></div>
    </div>
  </div>
);

export default Dashboard;

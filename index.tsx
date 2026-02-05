import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Mail, Lock, ArrowRight, Loader2, UserPlus, Key, ShieldCheck,
  LayoutDashboard, Users, LogOut, Activity, Cpu, Zap, Database, ChevronLeft,
  Smartphone, ShieldAlert, Fingerprint, Terminal, AlertTriangle
} from 'lucide-react';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- CONFIGURACIÓN FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyAs-Poner-Tu-Web-ApiKey-Real-Aqui", 
  authDomain: "ztchy-pro-9eaf8.firebaseapp.com",
  projectId: "ztchy-pro-9eaf8",
  storageBucket: "ztchy-pro-9eaf8.appspot.com",
  messagingSenderId: "112301005292",
  appId: "1:112301005292:web:manual-setup"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- COMPONENTES ---

const InputField = ({ label, icon: Icon, type, value, onChange, placeholder }) => (
  <div className="space-y-1.5 group">
    <label className="text-[10px] text-cyan-500/70 tracking-[0.2em] font-bold flex items-center gap-2 uppercase">
      <Icon size={12} /> {label}
    </label>
    <input 
      type={type} 
      value={value} 
      onChange={e => onChange(e.target.value)}
      className="w-full p-4 bg-black/60 border border-white/5 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
      placeholder={placeholder}
      required 
    />
  </div>
);

const AuthInterface = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('fulanitoperez@gmail.com');
  const [password, setPassword] = useState('fulanito');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (email === 'fulanitoperez@gmail.com' && password === 'fulanito') {
        onLoginSuccess(email);
      } else {
        setError('NODO NO IDENTIFICADO');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-[400px] glass-panel p-10 rounded-[30px] relative">
        <header className="text-center mb-10">
          <Fingerprint size={40} className="text-cyan-400 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-cyan-400 tracking-widest uppercase" style={{fontFamily:'Orbitron'}}>ZATOCHY PRO</h1>
        </header>
        {error && <div className="mb-4 text-red-500 text-xs text-center font-bold">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <InputField label="Identificador" icon={Mail} type="email" value={email} onChange={setEmail} placeholder="ID@ZATOCHY.PRO" />
          <InputField label="Clave Neural" icon={Lock} type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          <button type="submit" className="w-full py-4 bg-cyan-600/20 border border-cyan-500 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500 hover:text-black transition-all">
            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'INICIAR PROTOCOLO'}
          </button>
        </form>
      </div>
    </div>
  );
};

const Dashboard = ({ email, onLogout }) => (
  <div className="flex h-screen bg-[#020408]">
    <aside className="w-64 glass-panel border-r border-cyan-500/10 p-8 flex flex-col">
      <h1 className="text-xl font-black text-cyan-400 tracking-widest mb-12" style={{fontFamily:'Orbitron'}}>ZATOCHY</h1>
      <button onClick={onLogout} className="text-red-500/60 font-bold text-[10px] mt-auto flex items-center gap-2 hover:text-red-500">
        <LogOut size={16} /> DESCONECTAR
      </button>
    </aside>
    <main className="flex-1 p-12 bg-grid">
      <h2 className="text-4xl font-black text-white uppercase mb-8" style={{fontFamily:'Orbitron'}}>Bienvenido, Operativo</h2>
      <div className="grid grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20">
            <p className="text-cyan-400 text-xs font-bold uppercase mb-2">ID_NODO</p>
            <p className="text-white font-mono">{email}</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20">
            <p className="text-cyan-400 text-xs font-bold uppercase mb-2">STATUS</p>
            <p className="text-green-400 font-mono animate-pulse">ONLINE</p>
          </div>
      </div>
    </main>
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem('zatochy_user');
    if (saved) setUser(saved);
  }, []);
  const handleLogin = (e) => { setUser(e); localStorage.setItem('zatochy_user', e); };
  const handleLogout = () => { setUser(null); localStorage.removeItem('zatochy_user'); };

  return (
    <div className="min-h-screen">
      {!user ? <AuthInterface onLoginSuccess={handleLogin} /> : <Dashboard email={user} onLogout={handleLogout} />}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

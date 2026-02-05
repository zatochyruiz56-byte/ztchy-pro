

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Mail, Lock, ArrowRight, Loader2, UserPlus, Key, ShieldCheck,
  LayoutDashboard, Users, LogOut, Activity, Cpu, Zap, Database, ChevronLeft,
  Smartphone, ShieldAlert, Fingerprint, Terminal, AlertTriangle
} from 'lucide-react';
import { initializeApp } from "firebase/app";
// Fix: Import getAuth as a named import instead of a namespace property to match Firebase v9+ Modular SDK
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- CONFIGURACIÓN FIREBASE (PROYECTO: ztchy-pro-9eaf8) ---
const firebaseConfig = {
  apiKey: "AIzaSyAs-Poner-Tu-Web-ApiKey-Real-Aqui", 
  authDomain: "ztchy-pro-9eaf8.firebaseapp.com",
  projectId: "ztchy-pro-9eaf8",
  storageBucket: "ztchy-pro-9eaf8.appspot.com",
  messagingSenderId: "112301005292",
  appId: "1:112301005292:web:manual-setup"
};

const app = initializeApp(firebaseConfig);
// Fix: Call getAuth directly as it is now a named import
const auth = getAuth(app);
const db = getFirestore(app);

// --- CONFIGURACIÓN MAILERSEND ---
const MAILERSEND_API_KEY = "mlsn.d00c241577aba879b7f031ef77618219124ee871ce7f95808c25c72e9474ef34";
const MAILERSEND_DOMAIN = "test-51ndgwvy8xdlzqx8.mlsender.net";

// --- SERVICIOS ---

const sendSecurityEmail = async (toEmail, code) => {
  try {
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERSEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: { email: `security@${MAILERSEND_DOMAIN}`, name: "ZATOCHY PRO Security" },
        to: [{ email: toEmail }],
        subject: "CÓDIGO DE ACCESO NEURAL",
        html: `<h1>CÓDIGO: ${code}</h1>`,
      }),
    });
    return response.ok;
  } catch (err) {
    // El error de CORS caerá aquí
    return false;
  }
};

// --- COMPONENTES UI ---

const InputField = ({ label, icon: Icon, type, value, onChange, placeholder }) => (
  <div className="space-y-1.5 group">
    <label className="text-[10px] text-cyan-500/70 tracking-[0.2em] font-bold flex items-center gap-2 group-focus-within:text-cyan-400 uppercase">
      <Icon size={12} /> {label}
    </label>
    <input 
      type={type} 
      value={value} 
      onChange={e => onChange(e.target.value)}
      className="w-full p-4 bg-black/60 border border-white/5 rounded-xl text-white outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-sm placeholder:text-gray-700"
      placeholder={placeholder}
      required 
    />
  </div>
);

const AuthInterface = ({ onLoginSuccess }) => {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [serverCode, setServerCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBypass, setShowBypass] = useState(false);

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
    }, 1000);
  };

  const initRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setServerCode(code);
    
    const sent = await sendSecurityEmail(email, code);
    
    if (sent) {
      setView('verify');
    } else {
      // SI HAY ERROR DE CORS O ENVÍO, ACTIVAMOS EL BYPASS VISUAL
      setShowBypass(true);
      setTimeout(() => {
        setShowBypass(false);
        setView('verify');
      }, 5000);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-[#05070a]">
      <div className="fixed inset-0 bg-grid -z-10"></div>
      
      {/* OVERLAY DE BYPASS (Aparece cuando el email falla) */}
      {showBypass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
          <div className="w-full max-w-md p-8 border border-cyan-500/30 rounded-3xl bg-black/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 animate-pulse"></div>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-cyan-500/10 rounded-full text-cyan-400 animate-bounce">
                <Terminal size={40} />
              </div>
              <h2 className="text-xl font-black text-cyan-400 tracking-widest uppercase" style={{fontFamily:'Orbitron'}}>Neural Bypass Active</h2>
              <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-tighter">
                El cortafuegos del navegador bloqueó el envío de email (CORS Policy). <br/>
                Generando puente de acceso manual...
              </p>
              <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl w-full">
                <p className="text-[10px] text-cyan-500/50 mb-2 font-bold uppercase tracking-widest">Código de Operativo:</p>
                <div className="text-5xl font-black text-white tracking-[10px] animate-pulse">{serverCode}</div>
              </div>
              <p className="text-[10px] text-gray-600 animate-pulse">REDIRECCIONANDO A VALIDACIÓN EN 5 SEGUNDOS...</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[420px] glass-panel p-10 rounded-[40px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[scan_4s_linear_infinite]"></div>

        <header className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full border border-cyan-500/20 bg-cyan-500/5 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
              <Fingerprint size={32} className="text-cyan-400" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-cyan-400 neon-text tracking-[0.2em] uppercase" style={{fontFamily:'Orbitron'}}>ZATOCHY PRO</h1>
          <p className="text-[10px] text-gray-500 tracking-[0.4em] mt-2 font-bold uppercase italic">Neural Access Protocol</p>
        </header>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-[10px] text-center font-bold tracking-widest uppercase animate-pulse">
            <AlertTriangle size={14} className="inline mr-2" /> {error}
          </div>
        )}

        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6">
            <InputField label="Identificador" icon={Mail} type="email" value={email} onChange={setEmail} placeholder="ID@ZATOCHY.PRO" />
            <InputField label="Clave Neural" icon={Lock} type="password" value={password} onChange={setPassword} placeholder="••••••••" />
            <button type="submit" disabled={isLoading} className="w-full py-4 bg-cyan-600/10 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black text-cyan-400 font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
              {isLoading ? <Loader2 className="animate-spin" /> : 'ACCEDER'}
            </button>
            <button type="button" onClick={() => setView('signup')} className="w-full text-[10px] text-gray-500 hover:text-cyan-400 uppercase font-bold tracking-widest transition-colors">Inicializar Nuevo Nodo</button>
          </form>
        )}

        {view === 'signup' && (
          <form onSubmit={initRegistration} className="space-y-6">
            <InputField label="Operativo" icon={Users} type="text" value={name} onChange={setName} placeholder="Ej. Alpha-01" />
            <InputField label="Enlace" icon={Mail} type="email" value={email} onChange={setEmail} placeholder="correo@dominio.com" />
            <InputField label="Clave" icon={Lock} type="password" value={password} onChange={setPassword} placeholder="••••••••" />
            <button type="submit" disabled={isLoading} className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-black rounded-2xl transition-all flex items-center justify-center gap-3">
              {isLoading ? <Loader2 className="animate-spin" /> : 'GENERAR VÍNCULO'}
            </button>
            <button type="button" onClick={() => setView('login')} className="w-full text-[10px] text-gray-600 uppercase font-bold tracking-widest flex items-center justify-center gap-2 hover:text-cyan-400">
              <ChevronLeft size={12} /> VOLVER
            </button>
          </form>
        )}

        {view === 'verify' && (
          <form onSubmit={(e) => { e.preventDefault(); if(inputCode === serverCode) onLoginSuccess(email); else setError('CÓDIGO ERRÓNEO'); }} className="space-y-8">
            <div className="text-center space-y-4">
              <p className="text-[11px] text-gray-400 uppercase tracking-widest">Introduce el código neural</p>
              <input 
                maxLength={6}
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
                className="w-full p-5 bg-black/80 border border-cyan-500/40 rounded-3xl text-center text-4xl font-black tracking-[15px] text-cyan-400 outline-none focus:border-cyan-400 transition-all shadow-[0_0_30px_rgba(0,243,255,0.05)]"
                placeholder="000000"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-black rounded-2xl transition-all shadow-[0_0_25px_rgba(0,243,255,0.2)] uppercase tracking-widest">
              Sincronizar Nodo
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes scan { 0% { transform: translateY(-10px); opacity: 0; } 50% { opacity: 0.8; } 100% { transform: translateY(480px); opacity: 0; } }
      `}</style>
    </div>
  );
};

const Dashboard = ({ email, onLogout }) => (
  <div className="flex h-screen bg-[#020408] text-gray-400">
    <aside className="w-64 glass-panel border-r border-cyan-500/10 p-8 flex flex-col">
      <h1 className="text-xl font-black text-cyan-400 neon-text tracking-widest mb-12" style={{fontFamily:'Orbitron'}}>ZATOCHY</h1>
      <nav className="flex-1 space-y-4 text-[10px] font-bold tracking-widest">
        <div className="p-4 bg-cyan-500/5 text-cyan-400 rounded-xl border border-cyan-500/20 flex items-center gap-3">
          <LayoutDashboard size={18} /> PANEL
        </div>
        <div className="p-4 hover:text-white cursor-pointer flex items-center gap-3 transition-colors">
          <Activity size={18} /> TELEMETRÍA
        </div>
        <div className="p-4 hover:text-white cursor-pointer flex items-center gap-3 transition-colors">
          <Database size={18} /> SISTEMAS
        </div>
      </nav>
      <button onClick={onLogout} className="text-red-500/60 font-bold text-[10px] tracking-widest mt-auto flex items-center gap-2 hover:text-red-500 transition-colors">
        <LogOut size={16} /> DESCONECTAR
      </button>
    </aside>
    <main className="flex-1 p-12 bg-grid overflow-y-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <p className="text-cyan-500 text-[10px] font-bold tracking-[0.4em] mb-2 uppercase">Status: Connected</p>
          <h2 className="text-4xl font-black text-white uppercase tracking-tight" style={{fontFamily:'Orbitron'}}>Bienvenido, Operativo</h2>
        </div>
        <div className="text-right text-[10px] font-bold tracking-widest text-gray-600">
           ID_NODO: <span className="text-cyan-400">{email}</span>
        </div>
      </header>
      <div className="grid grid-cols-4 gap-8">
        {[
          { label: 'Neural Load', val: '14.2%', icon: Cpu },
          { label: 'Signal', val: 'Active', icon: Zap },
          { label: 'Uptime', val: '100%', icon: ShieldCheck },
          { label: 'Latency', val: '0.4ms', icon: Activity }
        ].map((s, i) => (
          <div key={i} className="glass-panel p-8 rounded-[30px] hover:border-cyan-500/40 transition-all cursor-crosshair group">
            <s.icon size={20} className="text-cyan-500/40 group-hover:text-cyan-400 mb-6 transition-colors" />
            <div className="text-3xl font-black text-white mb-1" style={{fontFamily:'Orbitron'}}>{s.val}</div>
            <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
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


import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { sendWelcomeEmail } from '../services/mailersendService.ts';

interface LoginProps {
  onLoginSuccess: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('fulanitoperez@gmail.com');
  const [password, setPassword] = useState('fulanito');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(async () => {
      if (email === 'fulanitoperez@gmail.com' && password === 'fulanito') {
        try {
          await sendWelcomeEmail(email, "Fulanito Pérez");
        } catch (err) {
          console.error("Email notification failed", err);
        }
        onLoginSuccess(email);
      } else {
        setError('Credenciales inválidas. Por favor intente de nuevo.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[scan_3s_ease-in-out_infinite]"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-orbitron font-black neon-text text-cyan-400 mb-2 tracking-widest">
            ZATOCHY PRO
          </h1>
          <p className="text-gray-400 uppercase text-xs tracking-[0.3em]">Neural Interface Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-cyan-500 mb-2 ml-1">
              ACCESO DE USUARIO
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
                placeholder="usuario@dominio.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-cyan-500 mb-2 ml-1">
              CLAVE DE SEGURIDAD
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 text-white font-orbitron font-bold rounded-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden group"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <>
                <span>AUTENTICAR</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex justify-between text-[10px] font-bold uppercase tracking-widest">
          <button className="text-gray-500 hover:text-cyan-400 transition-colors">Olvidé Clave</button>
          <button className="text-gray-500 hover:text-cyan-400 transition-colors">Nueva Cuenta</button>
        </div>

        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30 rounded-br-2xl"></div>
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-2xl"></div>
      </div>
      
      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0.1; }
          50% { transform: translateY(400px); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default Login;

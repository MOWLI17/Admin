import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../asset/logo.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#001b3a] p-6 font-sans">
      <div className="w-full max-w-md space-y-8 rounded-[40px] bg-white p-10 shadow-2xl shadow-black/40">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-full items-center justify-center overflow-hidden">
            <img src={logo} alt="ConnectNBuild Logo" className="h-full object-contain" />
          </div>
          <p className="mt-2 text-sm font-bold text-slate-500">Infrastructure Management Suite</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border-2 border-[#f1f5f9] bg-[#f8fafc] py-4 pl-12 pr-4 text-sm font-bold text-[#1e293b] outline-none transition-all placeholder:text-slate-400 focus:border-[#1e40af] focus:bg-white"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border-2 border-[#f1f5f9] bg-[#f8fafc] py-4 pl-12 pr-4 text-sm font-bold text-[#1e293b] outline-none transition-all placeholder:text-slate-400 focus:border-[#1e40af] focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#1e40af] focus:ring-[#1e40af]" />
              <label className="text-xs font-bold text-slate-500">Remember me</label>
            </div>
            <button type="button" className="text-xs font-bold text-[#1e40af] hover:underline">Forgot password?</button>
          </div>

          <button
            type="submit"
            className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1e40af] py-4 text-sm font-black text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-[#1d4ed8] active:scale-95"
          >
            Sign in to Console
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-slate-500 italic">
          Authorized personnel only. Secure terminal access.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

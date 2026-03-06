"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';

export default function SetupAdmin() {
  const [email, setEmail] = useState('admin@aesthetics8.com');
  const [password, setPassword] = useState('AdminPassword123!');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // try {
    //   const { data, error } = await supabase.auth.signUp({
    //     email,
    //     password,
    //   });

    //   if (error) throw error;

    //   setStatus({
    //     type: 'success',
    //     message: `Admin user created successfully! You can now log in at /login with ${email}.`
    //   });
    // } catch (err) {
    //   // Safely handling the error type without using 'any'
    //   setStatus({
    //     type: 'error',
    //     message: err instanceof Error ? err.message : 'Failed to create admin user.'
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20 px-4">
      <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 text-center">
        <ShieldCheck className="w-16 h-16 text-gold mx-auto mb-6" />
        <h1 className="text-3xl font-serif text-navy mb-4">Initial Admin Setup</h1>
        <p className="text-slate-500 mb-8 text-sm">
          Configure your administrator account. If the default email is rejected by your Supabase settings, please provide a different one.
        </p>

        {status && (
          <div className={cn(
            "p-4 rounded-xl mb-6 flex items-center gap-3 text-sm text-left",
            status.type === 'success' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
          )}>
            {status.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            {status.message}
          </div>
        )}

        <form onSubmit={handleSetup} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Admin Email</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-navy"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Admin Password</label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-navy"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white py-4 rounded-xl font-bold hover:bg-gold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Admin Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Fixed the TypeScript 'any' array issue by defining accepted tailwind class types
function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}
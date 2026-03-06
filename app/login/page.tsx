'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, LogIn, AlertCircle } from 'lucide-react';

// GSAP Import
import gsap from 'gsap';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Check Session
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push('/admin-dashboard');
      }
    };
    checkSession();
  }, [router]);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gsap-animate", {
        y: 30,
        opacity: 70,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      router.push('/admin-dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      // Added pt-32 for top margin, and adjusted flex to account for the spacing
      className="min-h-screen flex flex-col justify-center bg-slate-50 pt-16 sm:pt-32 pb-12 px-4 sm:px-6"    >
      <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 md:p-12">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="gsap-animate flex flex-col items-center mb-6">
            <span className="text-3xl font-serif font-bold text-navy tracking-tight">
              Aesthetics 8
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold -mt-1">
              Admin Portal
            </span>
          </div>

          <h1 className="gsap-animate text-2xl font-serif text-navy">Welcome Back</h1>
          <p className="gsap-animate text-slate-500 text-sm mt-2">
            Please enter your credentials to access the dashboard.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-700 text-sm mb-6 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          <div className="gsap-animate">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              placeholder="admin@aesthetics8.com"
            />
          </div>

          <div className="gsap-animate">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="gsap-animate w-full bg-navy text-white py-4 rounded-xl font-bold hover:bg-gold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
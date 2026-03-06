"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Award, Calendar, User, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

// GSAP Import
import gsap from 'gsap';

interface Certificate {
  student_name: string;
  course_name: string;
  course_duration: string;
  completion_date: string;
  cpd_number: string;
}

export default function Verify() {
  const [cpdNumber, setCpdNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Initial Load Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gsap-fade-up", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpdNumber.trim()) return;

    setLoading(true);
    setError(null);
    setCertificate(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('certificates')
        .select('*')
        .eq('cpd_number', cpdNumber.trim())
        .single();

      if (fetchError) throw fetchError;
      if (!data) throw new Error('Not found');

      setCertificate(data);
    } catch (err) {
      setError("No matching certificate found. Please check the number and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="pt-32 pb-24 min-h-screen bg-slate-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Page Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="gsap-fade-up mb-6">
            <Image 
              src="/logo.webp"
              alt="Aesthetics 8 by HA Academy Logo"
              width={180}
              height={60}
              priority
              className="object-contain"
            />
          </div>
          <h1 className="gsap-fade-up text-4xl md:text-5xl font-serif text-navy mb-6">Verify Certificate</h1>
          <p className="gsap-fade-up text-slate-600 max-w-2xl">
            Enter the CPD/Certificate number below to verify the authenticity of an Aesthetics 8 by HA credential.
          </p>
        </div>

        {/* Search Bar */}
        <div className="gsap-fade-up bg-white p-6 rounded-3xl shadow-xl border border-slate-100 mb-12">
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={cpdNumber}
                onChange={(e) => setCpdNumber(e.target.value)}
                placeholder="Enter Student CPD/Certificate Number..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-navy text-white px-10 py-4 rounded-2xl font-bold hover:bg-gold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify Now'}
            </button>
          </form>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center gap-4 text-red-700"
            >
              <AlertCircle className="w-6 h-6 shrink-0" />
              <p className="font-medium">{error}</p>
            </motion.div>
          )}

          {certificate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gold/20 relative"
            >
              {/* Certificate Top Border */}
              <div className="absolute top-0 left-0 w-full h-4 bg-gold" />
              
              <div className="p-12">
                <div className="flex justify-between items-center mb-12">
                  {/* Logo on the Certificate */}
                  <div className="flex items-center gap-4">
                    <Image 
                      src="/logo.webp"
                      alt="Logo"
                      width={80}
                      height={40}
                      className="object-contain"
                    />
                  </div>

                  <div className="text-right">
                    <div className="text-gold font-bold text-xs uppercase tracking-widest mb-1">Certificate ID</div>
                    <div className="text-navy font-mono font-bold">{certificate.cpd_number}</div>
                  </div>
                </div>

                <div className="text-center mb-12">
                  <Award className="w-16 h-16 text-gold mx-auto mb-6" />
                  <h2 className="text-gold font-serif text-xl italic mb-2">Certificate of Completion</h2>
                  <p className="text-slate-400 text-sm uppercase tracking-widest">This is to certify that</p>
                  <h3 className="text-4xl font-serif text-navy my-6">{certificate.student_name}</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    has successfully completed the professional training course in
                  </p>
                  <h4 className="text-2xl font-serif text-navy mt-4 mb-8">{certificate.course_name}</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Course</div>
                      <div className="text-sm font-bold text-navy">{certificate.course_name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Date</div>
                      <div className="text-sm font-bold text-navy">
                        {new Date(certificate.completion_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                      <User className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Duration</div>
                      <div className="text-sm font-bold text-navy">{certificate.course_duration}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
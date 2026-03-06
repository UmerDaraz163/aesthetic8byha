"use client";

import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Phone, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // 1. Add this import at the top
import { cn } from "@/lib/utils"; // Ensure you have this utility or replace with standard string concatenation

export default function Home() {
  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000"
            alt="Aesthetics Academy Clinic Interior" // Improved ALT text for SEO
            fill // Replaces w-full h-full
            priority // Loads this image first since it's "above the fold"
            className="object-cover opacity-60" // Moved classes here
            sizes="100vw" // Helps Next.js choose the right size
          />
          {/* Keeps the gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a059]/10 text-[#c5a059] text-xs font-bold uppercase tracking-wider mb-6 border border-[#c5a059]/20">
              <Sparkles className="w-3 h-3" />
              Excellence in Aesthetics
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-navy leading-[1.1] mb-6">
              Premier CPD-Accredited <br />
              <span className="text-[#c5a059] italic text-shadow-sm">Aesthetic Academy</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
              Unlock your future in the beauty & aesthetic industry with internationally recognized, UK-aligned, and evidence-based training.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/academy"
                // Primary Brand Gold -> Medical Blue on Hover
                className="bg-[#c5a059] text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#1e40af] transition-all shadow-lg shadow-[#c5a059]/20 group"
              >
                Explore Academy
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/clinic"
                className="bg-white border-2 border-navy text-navy px-8 py-4 rounded-full font-bold flex items-center justify-center hover:bg-navy hover:text-white transition-all shadow-md"
              >
                Book Clinic
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <span className="text-navy font-serif text-2xl font-bold">The CPD Group (UK)</span>
              <span className="text-slate-500 text-sm uppercase tracking-widest mt-1">Accredited Institution</span>
            </div>
            <div className="h-px w-12 bg-[#c5a059]/40 hidden md:block" />
            <div className="flex flex-col items-center">
              <span className="text-[#c5a059] font-serif text-3xl font-bold">#788651</span>
              <span className="text-slate-500 text-sm uppercase tracking-widest mt-1">Provider Number</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoCard
            icon={<Award className="w-6 h-6" />}
            title="UK-Aligned Training"
            description="Our curriculum follows strict UK standards, ensuring world-class education recognized internationally."
            variant="navy"
          />
          <InfoCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Clinical Excellence"
            description="Experience cutting-edge aesthetic treatments using global-standard protocols in our state-of-the-art clinic."
            variant="gold"
          />
          <InfoCard
            icon={<Phone className="w-6 h-6" />}
            title="Expert Guidance"
            description="Learn directly from Dr. Umm e Habiba and certified professionals with years of clinical experience."
            variant="navy"
          />
        </div>
      </section>
    </div>
  );
}

// Reusable Component for cleaner structure
function InfoCard({ icon, title, description, variant }: { icon: React.ReactNode, title: string, description: string, variant: 'gold' | 'navy' }) {
  return (
    <div className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-[#c5a059]/30 hover:shadow-2xl hover:shadow-[#c5a059]/5 transition-all group">
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
        variant === 'gold'
          ? "bg-[#c5a059] text-white shadow-lg shadow-[#c5a059]/20"
          : "bg-navy text-white group-hover:bg-[#1e40af]"
      )}>
        {icon}
      </div>
      <h3 className="text-xl font-serif text-navy mb-4">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
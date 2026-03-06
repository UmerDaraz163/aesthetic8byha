'use client';

import React, { useState } from 'react'; // Removed useEffect
import { motion } from 'motion/react';
import { Send, User, MessageSquare, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
// import { cn } from '@/lib/utils'; // Uncomment if you end up needing it for dynamic classes later

const CLINIC_SERVICES = [
  "Cosmetology",
  "Microblading",
  "Micropigmentation",
  "BB Glow",
  "Lip Tinting",
  "Cheeks Tinting",
  "Brow Lamination",
  "Lash Lifting",
  "Brow Tinting",
  "Eyelash Extensions"
];

const ACADEMY_SERVICES = [
  "Botox Training",
  "PRP Therapy Course",
  "Microneedling Masterclass",
  "Dermal Fillers Advanced",
  "Skin Booster Certification",
  "Chemical Peel Workshop"
];

type CategoryType = 'Clinic Treatment' | 'Academy Training';

export default function BookingForm() {
  const [category, setCategory] = useState<CategoryType>('Clinic Treatment');
  const [service, setService] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // ❌ We deleted the useEffect that was causing the cascading render warning!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = `Hello Aesthetics 8 by HA! I would like to book an appointment.
Name: ${name}
Category: ${category}
Service: ${service}
Message: ${message || 'No additional message'}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/923190090064?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const services = category === 'Clinic Treatment' ? CLINIC_SERVICES : ACADEMY_SERVICES;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden text-navy"
    >
      {/* Header */}
      <div className="bg-navy p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-24 h-24 text-gold" />
        </div>

        <h2 className="text-3xl font-serif mb-2">Book Appointment</h2>
        <p className="text-slate-300 text-sm">
          Fill out the form below to connect with us via WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <User className="w-3 h-3 text-gold" />
            Full Name
          </label>

          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:bg-white transition-all text-navy"
          />
        </div>

        {/* Category + Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Interest / Category
            </label>

            <div className="relative">
              <select
                value={category}
                onChange={(e) => {
                  // ✅ FIX: Update both states synchronously right here!
                  setCategory(e.target.value as CategoryType);
                  setService(''); 
                }}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-gold/50 appearance-none text-navy"
              >
                <option value="Clinic Treatment">Clinic Treatment</option>
                <option value="Academy Training">Academy Training</option>
              </select>

              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none"/>
            </div>
          </div>

          {/* Service */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Select Service
            </label>

            <div className="relative">
              <select
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-gold/50 appearance-none text-navy"
              >
                <option value="" disabled>
                  Choose a service...
                </option>

                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none"/>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <MessageSquare className="w-3 h-3 text-gold"/>
            Message (Optional)
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Tell us more about your requirements..."
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none text-navy"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-navy text-white py-5 rounded-2xl font-bold text-lg hover:bg-gold transition-all shadow-xl flex items-center justify-center gap-3 group"
        >
          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
          Send WhatsApp Request
        </button>

        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-500"/>
          Instant response via WhatsApp Business
        </div>

      </form>
    </motion.div>
  );
}
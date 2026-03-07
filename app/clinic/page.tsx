"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Check, ArrowRight, CalendarCheck } from "lucide-react";
import BookingForm from "@/components/BookingForm";

// GSAP Imports
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Clinic services updated based on official course modules 
const clinicServices = [
  { name: "Botox & Fillers", desc: "Expert administration of anti-wrinkle injections and dermal fillers for facial rejuvenation." },
  { name: "Laser Treatments", desc: "Advanced solutions including Carbon Laser, Tattoo Removal, and Pico Laser technology." },
  { name: "PRP Therapy", desc: "Regenerative treatments for facial skin rejuvenation and hair restoration." },
  { name: "Thread Lifting", desc: "Non-surgical face lifting using high-quality Cog Threads for structural support." },
  { name: "HydraFacial", desc: "Premium vortex-fusion treatment for deep cleansing, extraction, and hydration." },
  { name: "Skin Rejuvenation", desc: "Evidence-based anti-aging protocols including microneedling and chemical peels." },
  { name: "IV Glow Therapy", desc: "Nutrient-rich whitening drips administered under strict clinical protocols." },
  { name: "RF Skin Tightening", desc: "Radio Frequency technology to stimulate collagen and improve skin elasticity." },
  { name: "Clinical Analysis", desc: "Professional skin analysis and bespoke treatment planning for all skin types." },
];

export default function Clinic() {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Animations setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // 1. Hero Section Entrance (Fades and slides up on load)
      gsap.from(".gsap-hero", {
        y: 40,
        opacity: 0,
        duration: 0.2,
        stagger: 0.15,
        ease: "power3.out",
      });

      // 2. Services Grid Stagger (Triggers when scrolling to the grid)
      gsap.from(".gsap-service-card", {
        y: 50,
        opacity: 50, // Fixed: Opacity should be 0, not 50
        duration: 0.2,
        stagger: 0.1, // 0.1s delay between each card appearing
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gsap-services-grid",
          start: "top 85%", // Starts animation when the top of the grid hits 85% of the viewport height
        }
      });

      // 3. Booking Section Entrance (Subtle scale and fade up)
      gsap.from(".gsap-booking-section", {
        y: 40,
        scale: 0.98,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gsap-booking-section",
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 min-h-screen bg-[#fcfcfd] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="gsap-hero inline-flex mt-4 items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a059]/10 text-[#c5a059] text-[10px] font-black uppercase tracking-widest mb-4 border border-[#c5a059]/20">
            <Sparkles className="w-3 h-3" />
            Medical Excellence
          </div>
          <h1 className="gsap-hero text-4xl md:text-6xl font-serif text-[#0f172a] mb-6">
            Clinic <span className="text-[#c5a059] italic">Services</span>
          </h1>
          <p className="gsap-hero text-slate-500 text-lg leading-relaxed">
            Experience premium aesthetic treatments delivered with medical 
            precision and artistic excellence by our internationally certified practitioners.
          </p>
        </div>

        {/* Services Grid */}
        <div className="gsap-services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinicServices.map((service) => (
            <div
              key={service.name}
              className="gsap-service-card group relative bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[#c5a059]/10 hover:border-[#c5a059]/30 transition-all duration-500 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-[#c5a059] flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-white transition-all duration-500">
                  <Check className="w-7 h-7" />
                </div>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest pt-2">
                  CPD Verified
                </div>
              </div>

              <div className="flex-grow">
                <h3 className="text-2xl font-serif text-[#0f172a] mb-4 group-hover:text-[#1e40af] transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {service.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-50 mt-auto">
                <a
                  href="#booking"
                  className="flex items-center justify-between text-[#c5a059] font-bold text-[10px] uppercase tracking-[0.2em] group/btn"
                >
                  <span>Request Consultation</span>
                  <div className="flex items-center gap-1 group-hover/btn:translate-x-1 transition-transform">
                    <div className="w-6 h-px bg-[#c5a059]/30" />
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form Section */}
        <section id="booking" className="mt-32 sm:mt-40 max-w-4xl mx-auto scroll-mt-32">
          {/* Changed padding from p-10 to p-6 for mobile, md:p-16 for desktop */}
          <div className="gsap-booking-section bg-white rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#c5a059]/5 rounded-full blur-[80px]" />
            
            <div className="text-center mb-10 md:mb-12 relative z-10">
              <div className="inline-flex items-center gap-2 text-[#c5a059] font-bold text-xs uppercase tracking-widest mb-4">
                <CalendarCheck className="w-5 h-5" />
                Book Appointment
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0f172a] mb-4">
                Schedule Your <span className="text-[#c5a059]">Consultation</span>
              </h2>
              <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base">
                Our clinic is located at Commercial Market, Sharjah Center, D-Block Near Clock Tower, Rawalpindi.
              </p>
            </div>

            {/* Changed padding from p-6 to p-4 for mobile, md:p-10 for desktop */}
            <div className="relative z-10 bg-slate-50/50 p-4 md:p-10 rounded-2xl md:rounded-3xl border border-slate-100">
              <BookingForm />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
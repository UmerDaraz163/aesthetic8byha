"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  ShieldCheck, 
  Zap, 
  Award, 
  CheckCircle, 
  Globe, 
  UserCheck,
  Star,
  Users
} from "lucide-react";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";

// GSAP Imports
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const courseData: Record<string, { desc: string }> = {
  // --- INVASIVE TREATMENTS ---
  "Botox (Anti-Wrinkle Injections)": {
    desc: "Master upper and lower face neurotoxin application, including precise dilution protocols and complication management."
  },
  "Dermal Fillers": {
    desc: "Comprehensive training on hyaluronic acid properties, facial anatomy, and advanced volumization using needle and cannula techniques."
  },
  "Cog Threads (Face Lifting Threads)": {
    desc: "Advanced structural lifting module covering vector planning and tissue repositioning with high-tensile PDO cogs."
  },
  "Profhilo / Skin Boosters": {
    desc: "Learn bio-remodeling and deep hydration protocols focusing on the BAP technique for skin laxity."
  },
  "Exosomes Therapy": {
    desc: "Study the latest in regenerative aesthetics, focusing on cell-signaling therapy for advanced skin and hair restoration."
  },
  "PDRN / Rejuvenation Treatment": {
    desc: "Training in Polydeoxyribonucleotide (Salmon DNA) protocols for cellular-level clinical skin repair."
  },
  "Fat-Dissolving Injections": {
    desc: "Clinical lipolytic treatment protocols for submental and targeted body contouring using safe dissolving agents."
  },
  "Whitening Drips / IV Glow Therapy": {
    desc: "Master safe IV administration and nutrient mixing for evidence-based systemic skin brightening."
  },
  "Mole Removal": {
    desc: "Specialized module for clinical lesion assessment and professional removal using advanced cautery methods."
  },

  // --- NON-INVASIVE TREATMENTS ---
  "Carbon Laser Facial": {
    desc: "Professional training in the 'Hollywood Peel' using Q-Switched lasers for deep cleansing and oil control."
  },
  "Tattoo Removal Laser": {
    desc: "Study laser-skin interactions and specific wavelengths for safe, scar-free multi-colored pigment removal."
  },
  "Face PRP Therapy": {
    desc: "Master platelet concentration protocols and professional delivery for skin rejuvenation and facial glow."
  },
  "Microneedling / Dermapen": {
    desc: "Collagen Induction Therapy mastery, covering depth control and the application of clinical meso-cocktails."
  },
  "Hair PRP Therapy": {
    desc: "Anatomical focus on scalp treatments and injection patterns for hair thinning and androgenetic alopecia."
  },
  "Diamond Dermabrasion": {
    desc: "Master mechanical exfoliation protocols to effectively treat skin texture and superficial acne scarring."
  },
  "Chemical Peels": {
    desc: "In-depth study of pH levels and acid types (AHA/BHA/TCA) for customized clinical resurfacing."
  },
  "Skin Analysis": {
    desc: "Professional consultation training using digital analysis to create bespoke clinical treatment plans."
  },
  "Skin Rejuvenation Techniques": {
    desc: "A holistic overview of multi-modality clinical approaches to treat photodamage and early signs of aging."
  },
  "Anti-Aging Treatments": {
    desc: "Advanced study of the physiological aging process and combined evidence-based clinical protocols."
  },
  "HydraFacial": {
    desc: "Comprehensive mastery of vortex technology for deep extraction, exfoliation, and antioxidant hydration."
  },
  "Cold/Hot/Pico Laser Treatments": {
    desc: "Specialized training in laser physics and safety for treating hyperpigmentation and skin resurfacing."
  },
  "Radio Frequency (RF Skin Tightening)": {
    desc: "Master non-surgical tightening using controlled thermal energy to stimulate long-term elastin production."
  }
};

export default function Academy() {
  const [activeTab, setActiveTab] = useState<"invasive" | "non-invasive">("invasive");
  const containerRef = useRef<HTMLDivElement>(null);

  const invasiveCourses = Object.keys(courseData).slice(0, 9);
  const nonInvasiveCourses = Object.keys(courseData).slice(9);

  // Smooth scroll function to jump to the booking form
  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-section");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // GSAP Animations setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // We use gsap.context for easy cleanup in React
    const ctx = gsap.context(() => {
      // Animate the "About Us" section elements
      gsap.from(".gsap-fade-up", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gsap-fade-up",
          start: "top 85%", // Triggers when the top of the element hits 85% of the viewport height
        }
      });

      // Animate the "Why Join Us" and "Perfect For" cards
      gsap.from(".gsap-card-slide", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".gsap-card-container",
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 min-h-screen bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- ABOUT US SECTION --- */}
        <section className="mb-24 text-center max-w-4xl mx-auto">
          <div className="gsap-fade-up">
            <Image src="/logo.webp" alt="Logo" width={140} height={60} className="mx-auto mb-8 opacity-90" />
          </div>
          <h2 className="gsap-fade-up text-3xl font-serif text-[#0f172a] mb-6">About Aesthetic 8 by HA</h2>
          <p className="gsap-fade-up text-slate-500 text-lg leading-relaxed">
            Aesthetic 8 by HA is a leading aesthetic training institute offering CPD-certified courses 
            with hands-on practice, expert guidance, and internationally recognized standards. 
            We focus on high-quality education and live demonstrations to help students build confidence 
            and grow their careers in the aesthetic industry.
          </p>
        </section>

        {/* --- WHY JOIN US & PERFECT FOR --- */}
        <div className="gsap-card-container grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="gsap-card-slide bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-[#0f172a] mb-8 flex items-center gap-3">
              <Star className="w-6 h-6 text-[#c5a059] fill-[#c5a059]" /> Why Join Us?
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
              {[
                { icon: <CheckCircle className="w-5 h-5" />, text: "CPD UK Certified" },
                { icon: <UserCheck className="w-5 h-5" />, text: "Hands-On Training" },
                { icon: <Globe className="w-5 h-5" />, text: "Internationally Recognized" },
                { icon: <Users className="w-5 h-5" />, text: "Live Models" },
                { icon: <Star className="w-5 h-5" />, text: "Small Batches" },
                { icon: <Zap className="w-5 h-5" />, text: "Beginner Friendly" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                  <span className="text-[#c5a059]">{item.icon}</span> {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="gsap-card-slide bg-[#0f172a] p-10 rounded-[2.5rem] text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#c5a059]">
              <Users className="w-6 h-6" /> Perfect For
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Doctors", "Dentists", "Nurses", "Aestheticians", "Beginners", "Beauty Professionals"].map((role, i) => (
                <span key={i} className="px-5 py-2.5 rounded-full border border-white/20 bg-white/10 text-sm font-bold tracking-wide transition-colors hover:bg-white/20 cursor-default">
                  {role}
                </span>
              ))}
            </div>
            <p className="mt-10 text-[#c5a059] text-xs leading-relaxed uppercase tracking-[0.2em] font-black">
              Unlock your future in the aesthetic industry
            </p>
          </div>
        </div>

        {/* --- COURSE NAVIGATION --- */}
        <div className="gsap-fade-up text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#0f172a] mb-8">
            Our Training <span className="text-[#c5a059] italic">Modules</span>
          </h2>
          <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex shadow-inner">
            <button
              onClick={() => setActiveTab("invasive")}
              className={cn(
                "px-10 py-3.5 rounded-xl text-sm font-black transition-all flex items-center gap-2",
                activeTab === "invasive" ? "bg-[#0f172a] text-white shadow-lg" : "text-slate-500 hover:text-[#0f172a]"
              )}
            >
              <ShieldCheck className="w-4 h-4" /> INVASIVE
            </button>
            <button
              onClick={() => setActiveTab("non-invasive")}
              className={cn(
                "px-10 py-3.5 rounded-xl text-sm font-black transition-all flex items-center gap-2",
                activeTab === "non-invasive" ? "bg-[#0f172a] text-white shadow-lg" : "text-slate-500 hover:text-[#0f172a]"
              )}
            >
              <Zap className="w-4 h-4" /> NON-INVASIVE
            </button>
          </div>
        </div>

        {/* --- COURSES GRID --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {(activeTab === "invasive" ? invasiveCourses : nonInvasiveCourses).map((course, i) => {
              const data = courseData[course];
              return (
                <motion.div
                  key={i}
                  layout
                  onClick={scrollToBooking}
                  className="cursor-pointer bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[#c5a059]/10 hover:border-[#c5a059]/30 transition-all group flex flex-col justify-between min-h-[250px]"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-white transition-all duration-500">
                        <Award className="w-7 h-7" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif text-[#0f172a] mb-4 group-hover:text-[#c5a059] transition-colors">
                      {course}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {data.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* --- BOOKING SECTION --- */}
        <div id="booking-section" className="mt-32 max-w-4xl mx-auto scroll-mt-32">
          <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-[#0f172a] mb-4">Ready to Start?</h2>
              <p className="text-slate-500 font-medium">Complete the form below to receive full syllabus details and enrollment dates.</p>
            </div>
            <BookingForm />
          </div>
        </div>

      </div>
    </div>
  );
}
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
  Users,
  Sparkles
} from "lucide-react";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";

// GSAP Imports
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const courseData: Record<string, { desc: string }> = {
  // --- INVASIVE TREATMENTS ---
  "Botox (Anti-Wrinkle Injections)": { desc: "Master upper and lower face neurotoxin application, including precise dilution protocols and complication management." },
  "Dermal Fillers": { desc: "Comprehensive training on hyaluronic acid properties, facial anatomy, and advanced volumization using needle and cannula techniques." },
  "Cog Threads (Face Lifting Threads)": { desc: "Advanced structural lifting module covering vector planning and tissue repositioning with high-tensile PDO cogs." },
  "Profhilo / Skin Boosters": { desc: "Learn bio-remodeling and deep hydration protocols focusing on the BAP technique for skin laxity." },
  "Exosomes Therapy": { desc: "Study the latest in regenerative aesthetics, focusing on cell-signaling therapy for advanced skin and hair restoration." },
  "PDRN / Rejuvenation Treatment": { desc: "Training in Polydeoxyribonucleotide (Salmon DNA) protocols for cellular-level clinical skin repair." },
  "Fat-Dissolving Injections": { desc: "Clinical lipolytic treatment protocols for submental and targeted body contouring using safe dissolving agents." },
  "Whitening Drips / IV Glow Therapy": { desc: "Master safe IV administration and nutrient mixing for evidence-based systemic skin brightening." },
  "Mole Removal": { desc: "Specialized module for clinical lesion assessment and professional removal using advanced cautery methods." },

  // --- NON-INVASIVE TREATMENTS ---
  "Carbon Laser Facial": { desc: "Professional training in the 'Hollywood Peel' using Q-Switched lasers for deep cleansing and oil control." },
  "Tattoo Removal Laser": { desc: "Study laser-skin interactions and specific wavelengths for safe, scar-free multi-colored pigment removal." },
  "Face PRP Therapy": { desc: "Master platelet concentration protocols and professional delivery for skin rejuvenation and facial glow." },
  "Microneedling / Dermapen": { desc: "Collagen Induction Therapy mastery, covering depth control and the application of clinical meso-cocktails." },
  "Hair PRP Therapy": { desc: "Anatomical focus on scalp treatments and injection patterns for hair thinning and androgenetic alopecia." },
  "Diamond Dermabrasion": { desc: "Master mechanical exfoliation protocols to effectively treat skin texture and superficial acne scarring." },
  "Chemical Peels": { desc: "In-depth study of pH levels and acid types (AHA/BHA/TCA) for customized clinical resurfacing." },
  "Skin Analysis": { desc: "Professional consultation training using digital analysis to create bespoke clinical treatment plans." },
  "Skin Rejuvenation Techniques": { desc: "A holistic overview of multi-modality clinical approaches to treat photodamage and early signs of aging." },
  "Anti-Aging Treatments": { desc: "Advanced study of the physiological aging process and combined evidence-based clinical protocols." },
  "HydraFacial": { desc: "Comprehensive mastery of vortex technology for deep extraction, exfoliation, and antioxidant hydration." },
  "Cold/Hot/Pico Laser Treatments": { desc: "Specialized training in laser physics and safety for treating hyperpigmentation and skin resurfacing." },
  "Radio Frequency (RF Skin Tightening)": { desc: "Master non-surgical tightening using controlled thermal energy to stimulate long-term elastin production." },

  // --- COSMETOLOGY TREATMENTS ---
  "Microblading": { desc: "Master the art of semi-permanent eyebrow tattooing using fine, hair-like strokes for natural-looking enhancement." },
  "Micropigmentation": { desc: "Advanced training in cosmetic tattooing for eyeliner, brows, and scalp using digital machine techniques." },
  "BB Glow": { desc: "Learn micro-needling techniques infused with skin-toned serums for a semi-permanent foundation effect." },
  "Lip Tinting": { desc: "Specialized protocols for semi-permanent lip blushing to enhance color, symmetry, and definition." },
  "Cheeks Tinting": { desc: "Techniques for applying semi-permanent blush to create a natural, long-lasting rosy glow." },
  "Brow Lamination": { desc: "Master the chemical process of restructuring brow hairs to keep them in a desired shape and style." },
  "Lash Lifting": { desc: "Clinical techniques to curl and elevate natural eyelashes from the root for a longer, thicker appearance." },
  "Brow Tinting": { desc: "Professional color matching and application for semi-permanent enhancement of eyebrow depth and tone." },
  "Eyelash Extensions": { desc: "Comprehensive training on isolation and application of individual synthetic lashes to natural lashes." }
};

// Explicit category arrays to prevent duplication and make rendering cleaner
const invasiveCourses = [
  "Botox (Anti-Wrinkle Injections)", "Dermal Fillers", "Cog Threads (Face Lifting Threads)", 
  "Profhilo / Skin Boosters", "Exosomes Therapy", "PDRN / Rejuvenation Treatment", 
  "Fat-Dissolving Injections", "Whitening Drips / IV Glow Therapy", "Mole Removal"
];

const nonInvasiveCourses = [
  "Carbon Laser Facial", "Tattoo Removal Laser", "Face PRP Therapy", "Microneedling / Dermapen", 
  "Hair PRP Therapy", "Diamond Dermabrasion", "Chemical Peels", "Skin Analysis", 
  "Skin Rejuvenation Techniques", "Anti-Aging Treatments", "HydraFacial", 
  "Cold/Hot/Pico Laser Treatments", "Radio Frequency (RF Skin Tightening)"
];

const cosmetologyCourses = [
  "Microblading", "Micropigmentation", "BB Glow", "Lip Tinting", "Cheeks Tinting", 
  "Brow Lamination", "Lash Lifting", "Brow Tinting", "Eyelash Extensions"
];

export default function Academy() {
  const [activeTab, setActiveTab] = useState<"invasive" | "non-invasive" | "cosmetology">("invasive");
  const containerRef = useRef<HTMLDivElement>(null);

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
    
    const ctx = gsap.context(() => {
      gsap.from(".gsap-fade-up", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gsap-fade-up",
          start: "top 85%", 
        }
      });

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

    return () => ctx.revert(); 
  }, []);

  // Determine which array to render based on the active tab
  const currentCourses = 
    activeTab === "invasive" ? invasiveCourses : 
    activeTab === "non-invasive" ? nonInvasiveCourses : 
    cosmetologyCourses;

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
        <div className="gsap-fade-up text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#0f172a] mb-8">
            Our Training <span className="text-[#c5a059] italic">Modules</span>
          </h2>
          <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex flex-wrap justify-center shadow-inner gap-1 sm:gap-0">
            <button
              onClick={() => setActiveTab("invasive")}
              className={cn(
                "px-8 py-3.5 rounded-xl text-sm font-black transition-all flex items-center gap-2",
                activeTab === "invasive" ? "bg-[#0f172a] text-white shadow-lg" : "text-slate-500 hover:text-[#0f172a]"
              )}
            >
              <ShieldCheck className="w-4 h-4" /> INVASIVE
            </button>
            <button
              onClick={() => setActiveTab("non-invasive")}
              className={cn(
                "px-8 py-3.5 rounded-xl text-sm font-black transition-all flex items-center gap-2",
                activeTab === "non-invasive" ? "bg-[#0f172a] text-white shadow-lg" : "text-slate-500 hover:text-[#0f172a]"
              )}
            >
              <Zap className="w-4 h-4" /> NON-INVASIVE
            </button>
            <button
              onClick={() => setActiveTab("cosmetology")}
              className={cn(
                "px-8 py-3.5 rounded-xl text-sm font-black transition-all flex items-center gap-2",
                activeTab === "cosmetology" ? "bg-[#0f172a] text-white shadow-lg" : "text-slate-500 hover:text-[#0f172a]"
              )}
            >
              <Sparkles className="w-4 h-4" /> COSMETOLOGY
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
            {currentCourses.map((course, i) => {
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
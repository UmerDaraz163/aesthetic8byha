'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, X, ZoomIn, ShieldCheck } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function About() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const certifications = [
    "Diploma in Clinical Dermatology & Aesthetic Medicine – HiQual UK (EQF Certified)",
    "Diploma in Aesthetic Medicine – Canadian Derma Academy",
    "Advanced Aesthetic Training Program – Doctor’s Place Academy",
    "Comprehensive Aesthetic Certification – London Aesthetics UK",
    "Professional Masterclass – ISA Skills Academy"
  ];

  // These represent your CPD Accreditation documents
  const cpdCertificates = [
    {
      src: "/certificate.webp",
      title: "CPD Group UK Approved Dr"
    },
    {
      src: "/Aesthetics1.webp",
      title: "CPD Group UK Provider"
    },
    {
      src: "/Aesthetics2.webp",
      title: "CPD Group UK Provider"
    },
  ];

  // GSAP Animations setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // 1. Animate the main card container sliding up
      gsap.from(".gsap-founder-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gsap-founder-card",
          start: "top 85%", // Triggers when the top of the card hits 85% of viewport
        }
      });

      // 2. Animate the left column (Image) sliding in from the left
      gsap.from(".gsap-left-col", {
        x: -40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gsap-founder-card",
          start: "top 80%",
        }
      });

      // 3. Animate the right column heading and text sliding in from the right
      gsap.from(".gsap-right-col-content", {
        x: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gsap-founder-card",
          start: "top 80%",
        }
      });

      // 4. Stagger animate the qualifications list items
      gsap.from(".gsap-cert-item", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1, // 0.1s delay between each item
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gsap-cert-list",
          start: "top 90%",
        }
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ... Institute Section (Keep from previous response) ... */}

        {/* Founder Section */}
        <div className="gsap-founder-card bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            <div className="lg:col-span-1 gsap-left-col">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl mb-6 group border-4 border-white">
                <Image
                  src="/Dr_habiba.png"
                  alt="Dr Umm e Habiba"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-serif text-[#0f172a] mb-1">Dr Umm e Habiba (MD)</h3>
              <p className="text-[#c5a059] font-bold tracking-tight uppercase text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                CPD Certified Aesthetic Trainer
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="gsap-right-col-content">
                <h2 className="text-3xl font-serif text-[#0f172a] mb-8 flex items-center gap-3">
                  <Award className="text-[#c5a059] w-8 h-8" />
                  Accredited Expertise
                </h2>
                
                <p className="text-slate-600 text-lg leading-relaxed mb-10">
                  Aesthetics 8 by HA is strictly aligned with UK standards. Our CPD (Continuing Professional Development) status ensures that every course we offer and every treatment we perform meets the rigorous criteria of international medical aesthetics.
                </p>
              </div>

              {/* CPD Accreditation Slider */}
              <div className="mb-12 gsap-right-col-content">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h4 className="text-[#0f172a] font-bold uppercase tracking-widest text-xs">Accreditations & Certifications</h4>
                    <p className="text-slate-500 text-xs mt-1">Click to view full CPD accreditation details</p>
                  </div>
                </div>

                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{ 640: { slidesPerView: 2 } }}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 4000 }}
                  className="pb-12"
                >
                  {cpdCertificates.map((cert, index) => (
                    <SwiperSlide key={index}>
                      <div 
                        className="relative h-56 bg-white rounded-xl border-2 border-slate-200 cursor-pointer group overflow-hidden shadow-sm hover:shadow-md transition-all"
                        onClick={() => setSelectedImg(cert.src)}
                      >
                        <Image 
                          src={cert.src} 
                          alt={cert.title} 
                          fill 
                          className="object-contain p-4 transition-transform group-hover:scale-110" 
                        />
                        {/* Status Badge */}
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3 h-3" /> VERIFIED CPD
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[#0f172a]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                           <ZoomIn className="w-10 h-10 mb-2" />
                           <span className="text-xs font-bold uppercase tracking-widest">View Document</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* List of Qualifications */}
              <div className="space-y-3 gsap-cert-list">
                <h4 className="text-[#0f172a] font-bold uppercase tracking-widest text-xs mb-4 gsap-cert-item">Academic Background</h4>
                {certifications.map((cert, i) => (
                  <div key={i} className="gsap-cert-item flex gap-3 items-start p-4 bg-white rounded-xl border border-slate-100 hover:border-[#c5a059]/30 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full Image Lightbox - Left as Framer Motion for unmount handling */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 z-[100] bg-[#0f172a]/95 flex items-center justify-center p-4 backdrop-blur-md"
            >
              <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                <X size={40} />
              </button>
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="relative w-full max-w-5xl h-[85vh] bg-white rounded-lg p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Image 
                  src={selectedImg} 
                  alt="CPD Accreditation Document" 
                  fill 
                  className="object-contain" 
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
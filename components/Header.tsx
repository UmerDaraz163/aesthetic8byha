"use client";

import { Phone, Award, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Academy", href: "/academy" },
    { name: "Clinic", href: "/clinic" },
    { name: "Verify Certificate", href: "/verify" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-navy text-white py-2 px-4 text-center text-xs sm:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-8">
          <span className="flex items-center gap-1">
            <Award className="w-4 h-4 text-gold" />
            CPD Accredited Provider #788651
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-4 h-4 text-gold" />
             <a href="tel:+923190090064" className="hover:underline">Call Us: 0319-0090064</a>
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Area */}
          <Link href="/" className="flex items-center -ml-4"> {/* Pulls logo left to align with container */}
            <Image
              src="/logo.webp"
              alt="Aesthetics 8 by HA"
              width={160}
              height={80}
              className="object-contain h-20 w-auto mix-blend-multiply" // mix-blend-multiply makes white backgrounds transparent
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gold",
                  pathname === link.href ? "text-gold" : "text-navy"
                )}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/verify"
              className="bg-gold text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-navy transition-all shadow-md"
            >
              Verify Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-navy"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-navy font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/verify"
            className="block bg-gold text-white text-center py-3 rounded-lg font-bold"
            onClick={() => setIsOpen(false)}
          >
            Verify Certificate
          </Link>
        </div>
      )}
    </header>
  );
}
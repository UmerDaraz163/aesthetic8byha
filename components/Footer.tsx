import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div className="space-y-4">
          {/* Brand with Logo */}
          <Link href="/" className="flex items-center justify-center">
            <img
              src="/logo.webp" // replace with your actual logo path
              alt="Aesthetics 8 by HA Logo"
              className="w-30 h-30 object-cover rounded-full border-2 border-gold"
            />
          </Link>

          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Premier CPD-accredited Aesthetic Academy and Clinic committed to
            raising the standards of aesthetic education and clinical
            excellence.
          </p>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/aesthetics8byha/"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://www.facebook.com/p/Aesthetic-8-By-HA-61583319774326/"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gold font-serif text-lg mb-6">Quick Links</h3>

          <ul className="space-y-3 text-sm text-slate-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/academy"
                className="hover:text-white transition-colors"
              >
                Academy Courses
              </Link>
            </li>

            <li>
              <Link
                href="/clinic"
                className="hover:text-white transition-colors"
              >
                Clinic Services
              </Link>
            </li>

            <li>
              <Link
                href="/verify"
                className="hover:text-white transition-colors"
              >
                Verify Certificate
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-gold font-serif text-lg mb-6">Contact Us</h3>

          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-gold shrink-0" />
              <span>
                Commercial Market, Sharjah Center, D-Block Near Clock Tower,
                Rawalpindi.
              </span>
            </li>

            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-gold shrink-0" />
              <a href="tel:+923190090064" className="hover:underline">0319-0090064</a>
            </li>

            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-gold shrink-0" />
              <a href="mailto:hussainhabiba576@gmail.com" className="hover:underline">
                hussainhabiba576@gmail.com
              </a>
            </li>

          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-center text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()} Aesthetics 8 by HA. All Rights Reserved.
          CPD Accredited Provider #788651
        </p>
      </div>
    </footer>
  );
}
import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { FEATURED_DESTINATIONS } from '../data/destinations';

export default function Destinations({ t, lang }) {
  const handleScrollToPackages = (e) => {
    e.preventDefault();
    document.querySelector('#paket-wisata')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="destinasi" className="relative py-20 md:py-24 bg-[#F5F2EB] overflow-hidden">
      {/* Topographic Contour Texture Lines (Subtle SVG Overlay) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.07] pointer-events-none select-none">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#1B4332]" strokeWidth="1.5">
          <path d="M 50 150 Q 150 50 250 120 T 380 90" />
          <path d="M 20 200 Q 130 90 270 170 T 390 140" />
          <path d="M 0 250 Q 160 140 290 220 T 400 190" />
          <path d="M 40 310 Q 180 200 320 280 T 410 240" />
          <path d="M 70 370 Q 210 250 350 330 T 420 300" />
          <circle cx="280" cy="180" r="45" strokeDasharray="3 3" />
          <circle cx="280" cy="180" r="90" />
          <circle cx="280" cy="180" r="140" strokeDasharray="6 4" />
        </svg>
      </div>

      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] opacity-[0.06] pointer-events-none select-none">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#1B4332]" strokeWidth="1.5">
          <path d="M 10 100 Q 140 30 240 90 T 390 60" />
          <path d="M 0 160 Q 130 80 260 140 T 400 120" />
          <path d="M 20 220 Q 150 130 280 200 T 380 180" />
          <path d="M 40 290 Q 170 190 310 260 T 390 240" />
          <circle cx="150" cy="200" r="60" />
          <circle cx="150" cy="200" r="110" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header with Category Badge */}
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-[#1B4332]/10 text-[#1B4332] border border-[#1B4332]/20 text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>{t.destinations.tag}</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C] tracking-tight font-sans">
            {t.destinations.title}
          </h2>

          <p className="text-[#4A554E] text-base leading-relaxed">
            {t.destinations.subtitle}
          </p>
        </div>

        {/* 3 Horizontal Rectangular Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_DESTINATIONS.map((dest, index) => (
            <motion.a
              key={dest.id}
              href="#paket-wisata"
              onClick={handleScrollToPackages}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] border border-[#EAE6DF] shadow-warm-card hover:shadow-warm-hover transition-all duration-300 flex flex-col justify-end p-6 cursor-pointer"
            >
              {/* Background Image with Hover Scale */}
              <img
                src={dest.image}
                alt={dest.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent group-hover:from-black/90 transition-colors" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-[11px] font-semibold tracking-wide text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {dest.badge}
                </span>

                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#1B4332] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Content Bottom */}
              <div className="relative z-10 space-y-1.5 text-white">
                <span className="text-xs font-semibold text-[#D4A373] tracking-wide block">
                  {dest.packageCount} ({t.destinations.activePackages})
                </span>
                <h3 className="text-xl font-bold leading-tight group-hover:text-[#D4A373] transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-[#EAE6DF] line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Adventure Stamp Badge (Inter-Section Seal) */}
        <div className="mt-14 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-[#EAE6DF] px-5 py-2.5 rounded-full shadow-xs text-xs font-semibold text-[#17231C]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] animate-pulse" />
            <span className="tracking-wide">✦ 100% VERIFIED LOCAL GUIDES • SUSTAINABLE TOURISM ✦</span>
            <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
          </div>
        </div>

      </div>
    </section>
  );
}

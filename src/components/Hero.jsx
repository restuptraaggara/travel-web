import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateGeneralWhatsAppUrl } from '../utils/formatters';

const HERO_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2000&q=85',
    title: 'Labuan Bajo & Pulau Padar',
  },
  {
    url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=2000&q=85',
    title: 'Sunrise Gunung Bromo Tengger',
  },
  {
    url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=2000&q=85',
    title: 'Danau Toba & Bukit Holbung',
  },
  {
    url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=85',
    title: 'Raja Ampat & Derawan Turquoise Waters',
  },
];

export default function Hero({ t, lang }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] md:min-h-[95vh] w-full flex flex-col justify-end overflow-hidden bg-slate-950">
      {/* Layer 0 (Paling bawah): Slideshow gambar bergerak full-bleed dengan Ken Burns Crossfade */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <img
            key={slide.url}
            src={slide.url}
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover object-center select-none duration-1000 ease-out transition-all ${
              idx === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
          />
        ))}
      </div>

      {/* Layer 1: Overlay gradien hitam transparan halus agar foto alam cerah dan teks putih kontras */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/50 pointer-events-none z-[1]" />

      {/* Layer 3 (Paling atas): Editorial Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl px-6 sm:px-12 pb-20 sm:pb-28 pt-36"
      >
        {/* Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D4A373] text-[11px] font-semibold tracking-widest uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Headline H1 */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#FAF8F5] tracking-tight leading-[1.12] mb-6 font-sans">
          {t.hero.title}
        </h1>

        {/* Subhead Naratif */}
        <p className="text-[#EAE6DF] text-base sm:text-lg max-w-2xl font-normal leading-relaxed text-balance mb-8">
          {t.hero.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Link
            to="/paket-wisata"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-[#17231C] bg-[#FAF8F5] hover:bg-white shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>{t.hero.ctaExplore}</span>
            <ArrowRight className="w-4 h-4 text-[#1B4332]" />
          </Link>

          <a
            href={generateGeneralWhatsAppUrl(
              lang === 'id'
                ? 'Halo Admin NusantaraVista, saya ingin konsultasi rencana rute kustom privat.'
                : 'Hello NusantaraVista, I would like to consult about planning a custom private trip.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-[#FAF8F5] bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#D4A373]" />
            <span>{t.hero.ctaCustom}</span>
          </a>
        </div>
      </motion.div>

      {/* Indikator Slide di Pojok Kanan Bawah */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.url}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Pindah ke slide ${idx + 1}: ${slide.title}`}
          />
        ))}
      </div>
    </section>
  );
}

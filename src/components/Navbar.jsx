import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateGeneralWhatsAppUrl } from '../utils/formatters';

export default function Navbar({ lang, onSetLang, t }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: t.nav.destinations, path: '/destinasi', href: '/destinasi' },
    { label: t.nav.packages, path: '/paket-wisata', href: '/paket-wisata' },
    { label: t.nav.rental, path: '/rental-armada', href: '/rental-armada' },
    { label: t.nav.whyUs, path: '/kenapa-kami', href: '/kenapa-kami' },
    { label: t.nav.gallery, path: '/galeri', href: '/galeri' },
    { label: t.nav.contact, path: '/kontak', href: '/kontak' },
  ];

  // In non-home pages or when scrolled, show crisp warm header background
  const hasSolidBg = !isHomePage || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasSolidBg
          ? 'backdrop-blur-md bg-[#FAF8F5]/95 py-3.5 border-b border-[#EAE6DF] shadow-xs'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between gap-6 relative z-50">
        
        {/* Sisi Kiri: Logo Mandiri */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <span
            className={`text-2xl font-bold tracking-tight font-sans transition-colors ${
              hasSolidBg ? 'text-[#17231C]' : 'text-white'
            }`}
          >
            NusantaraVista<span className={hasSolidBg ? 'text-[#1B4332] font-black' : 'text-[#10B981] font-black'}>.</span>
          </span>
        </Link>

        {/* Tengah: Smooth Sliding Pill Navigation dengan Framer Motion */}
        <nav className="hidden lg:flex items-center">
          <ul
            className={`flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300 ${
              hasSolidBg
                ? 'bg-black/[0.04] border-[#EAE6DF]'
                : 'bg-black/30 backdrop-blur-md border-white/10'
            }`}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href} className="relative">
                  <Link
                    to={item.href}
                    className={`relative z-10 block px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? hasSolidBg
                          ? 'text-white font-bold'
                          : 'text-[#17231C] font-bold'
                        : hasSolidBg
                        ? 'text-[#4A554E] hover:text-[#17231C]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className={`absolute inset-0 rounded-full shadow-md z-0 ${
                        hasSolidBg ? 'bg-[#1B4332]' : 'bg-white'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sisi Kanan: Action Badges & CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Lencana "Admin Online" */}
          <div
            className={`hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${
              hasSolidBg
                ? 'bg-emerald-50/90 border border-emerald-200 text-emerald-800 font-semibold'
                : 'bg-black/40 border border-white/10 text-slate-200'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">
              {lang === 'id' ? 'Admin Online • Balas Cepat' : 'Admin Online • Fast Reply'}
            </span>
          </div>

          {/* Switcher ID | EN */}
          <div
            className={`flex items-center rounded-full p-1 text-xs font-semibold border transition-all ${
              hasSolidBg
                ? 'bg-white border-[#EAE6DF] text-[#4A554E]'
                : 'bg-black/40 border-white/10 text-slate-200 backdrop-blur-md'
            }`}
          >
            <button
              type="button"
              onClick={() => onSetLang('id')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer font-bold ${
                lang === 'id'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : hasSolidBg
                  ? 'hover:text-[#17231C]'
                  : 'hover:text-white'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => onSetLang('en')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer font-bold ${
                lang === 'en'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : hasSolidBg
                  ? 'hover:text-[#17231C]'
                  : 'hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* CTA Button "Pesan Sekarang" */}
          <a
            href={generateGeneralWhatsAppUrl(
              lang === 'id'
                ? 'Halo Admin NusantaraVista, saya ingin reservasi/tanya jadwal trip.'
                : 'Hello NusantaraVista Team, I would like to inquire about upcoming tour schedules.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#1B4332] hover:bg-[#2D6A4F] shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>{t.nav.bookNow}</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-1.5 rounded-lg transition-colors cursor-pointer ${
              hasSolidBg ? 'text-[#17231C]' : 'text-white'
            }`}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EAE6DF] px-6 py-5 space-y-4 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-base font-semibold py-2 border-b border-[#EAE6DF]/60 transition-colors ${
                  isActive ? 'text-[#1B4332] font-bold' : 'text-[#17231C]'
                }`
              }
            >
              {lang === 'id' ? 'Beranda' : 'Home'}
            </NavLink>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-base font-semibold py-2 border-b border-[#EAE6DF]/60 transition-colors ${
                    isActive ? 'text-[#1B4332] font-bold' : 'text-[#17231C]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{lang === 'id' ? 'Admin Online • Balas Cepat' : 'Admin Online • Fast Reply'}</span>
            </div>

            <a
              href={generateGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs text-white bg-[#1B4332] hover:bg-[#2D6A4F] shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{t.nav.bookNow} (WhatsApp)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

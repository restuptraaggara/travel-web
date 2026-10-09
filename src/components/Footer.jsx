import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Clock, MapPin, Mail, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/formatters';
import GhostFibers from './GhostFibers';

export default function Footer({ t, lang }) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Section Banner CTA Bawah (Sebelum Footer) */}
      <div className="px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden bg-[#112218] py-20 px-6 sm:px-12 my-12 rounded-3xl max-w-7xl mx-auto text-white shadow-xl">
          {/* Background Aurora Halus & Disesuaikan */}
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen z-0">
            <GhostFibers
              brightness={1.5}
              glowColor="#10B981"
              layers={4}
              lineColor="#042F24"
              scale={2.4}
              speed={0.15}
              waveAmplitude={0.015}
            />
          </div>

          {/* Konten CTA Tetap di Depan */}
          <div className="relative z-10 max-w-2xl text-left">
            <span className="text-xs uppercase tracking-widest text-[#D4A373] font-semibold">
              {lang === 'id' ? 'Konsultasi Gratis Bersama Tim Kami' : 'Free Consultation With Our Team'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-white">
              {lang === 'id' ? 'Siap Merencanakan Liburan Impianmu?' : 'Ready to Plan Your Dream Vacation?'}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {lang === 'id'
                ? 'Diskusikan rute impian, jumlah peserta, dan anggaran bersama admin kami. Respon cepat, ramah, dan solutif.'
                : 'Discuss your dream route, party size, and budget with our guides. Fast, warm, and helpful response.'}
            </p>
            <a
              href="https://wa.me/628116602898?text=Halo%20Admin%20NusantaraVista,%20saya%20ingin%20konsultasi%20trip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{lang === 'id' ? 'Chat WhatsApp Sekarang' : 'Chat WhatsApp Now'}</span>
            </a>
          </div>
        </section>
      </div>

      <footer id="kontak" className="bg-[#112218] text-[#EAE6DF] pt-14 pb-12 border-t border-[#D4A373]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* 3-Column Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Kolom 1: Profil Singkat, Izin Biro, Hak Cipta (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white font-sans block hover:opacity-90 transition-opacity">
              NusantaraVista<span className="text-[#D4A373]">.</span>
            </Link>

            <p className="text-sm text-[#859088] leading-relaxed max-w-sm">
              {t.footer.agencyDesc}
            </p>

            <div className="space-y-1.5 pt-2 text-xs text-[#859088]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                <span>{t.footer.licenseNIB}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                <span>{t.footer.licenseTDUP}</span>
              </div>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat Mengarah ke Route URL (Col 6-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#D4A373]">
              {t.footer.quickNav}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#859088]">
              <li>
                <Link to="/" className="hover:text-white transition-colors cursor-pointer">
                  {lang === 'id' ? 'Beranda' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/destinasi" className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.destinations}
                </Link>
              </li>
              <li>
                <Link to="/paket-wisata" className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.packages}
                </Link>
              </li>
              <li>
                <Link to="/rental-armada" className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.rental}
                </Link>
              </li>
              <li>
                <Link to="/kenapa-kami" className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.whyUs}
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.gallery}
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Resmi (Col 9-12) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#D4A373]">
              {t.footer.officialContact}
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white text-xs block font-medium">
                    {t.footer.officeAddressLabel}
                  </span>
                  <span className="text-xs text-[#859088]">
                    {t.footer.officeAddress}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white text-xs block font-medium">
                    {t.footer.responseHoursLabel}
                  </span>
                  <span className="text-xs text-[#859088]">
                    {t.footer.responseHours}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white text-xs block font-medium">
                    {t.footer.phoneLabel}
                  </span>
                  <a
                    href="https://wa.me/628116602898"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#25D366] hover:underline font-semibold"
                  >
                    +62 811-6602-898 (Fast Response)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white text-xs block font-medium">
                    {t.footer.emailLabel}
                  </span>
                  <span className="text-xs text-[#859088]">info@nusantaravista.com</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#859088]">
          <p>© {currentYear} {t.footer.rights}</p>
          <div className="flex items-center gap-1.5">
            <span>{t.footer.madeWith}</span>
            <Heart className="w-3.5 h-3.5 text-[#C86D51] fill-[#C86D51]" />
          </div>
        </div>

      </div>
    </footer>
  </>
  );
}

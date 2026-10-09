import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, HeartHandshake, Users, Leaf, ArrowRight, MessageCircle, FileCheck, CheckCircle2 } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/formatters';
import GhostFibers from '../components/GhostFibers';

export default function KenapaKami({ t, lang }) {
  const certifications = [
    {
      title: 'Nomor Induk Berusaha (NIB)',
      number: '9120304918239',
      desc: 'Biro Perjalanan Wisata (BPW) Resmi Terdaftar di Kementerian Investasi & BKPM RI.',
    },
    {
      title: 'Tanda Daftar Usaha Pariwisata (TDUP)',
      number: '556/BPW/KEMENPAREKRAF',
      desc: 'Lisensi operasional biro perjalanan resmi Kementerian Pariwisata dan Ekonomi Kreatif.',
    },
    {
      title: 'Himpunan Pramuwisata Indonesia (HPI)',
      number: 'Lisensi Guide Nasional',
      desc: 'Seluruh tour leader dan pemandu lapangan kami memegang sertifikasi kompetensi resmi HPI.',
    },
    {
      title: 'APGI & Safety First Aid Rescue',
      number: 'Mountain & Marine Certified',
      desc: 'Kru pendakian gunung dan bahari terlatih dalam prosedur evakuasi medis & keselamatan bahari.',
    },
  ];

  return (
    <div className="pt-24 pb-20 overflow-hidden bg-[#FAF8F5]">
      {/* 1. PAGE HEADER & BREADCRUMB */}
      <section className="relative py-14 sm:py-20 bg-[#17231C] text-white overflow-hidden">
        {/* Layer Aurora Background (Emerald Green Aurora) */}
        <div className="absolute inset-0 pointer-events-none opacity-70 z-0 overflow-hidden">
          <GhostFibers
            lineColor="#042F24"
            glowColor="#10B981"
            speed={0.18}
            scale={2.2}
            layers={5}
            waveFrequency={2.8}
            waveAmplitude={0.02}
            brightness={1.7}
            dpr={1}
            fps={60}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#17231C] via-[#17231C]/60 to-transparent pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 text-center sm:text-left">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-[#D4A373] uppercase tracking-wider mb-4">
            <Link to="/" className="hover:underline text-[#EAE6DF]">
              {lang === 'id' ? 'Beranda' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-[#D4A373]">{t.nav.whyUs}</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest text-[#D4A373] uppercase mb-4">
            <Award className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>{t.whyUs.serviceTag}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-white max-w-3xl mb-4">
            {t.whyUs.title}
          </h1>

          <p className="text-sm sm:text-base text-[#EAE6DF] max-w-2xl leading-relaxed">
            {lang === 'id'
              ? 'Kami bukan biro wisata massal yang menjual tiket grosir. Kami adalah boutique tour organizer yang mengutamakan rasa kekeluargaan, kedalaman budaya, dan respek pada alam nusantara.'
              : 'We are not a mass-market reseller. We are a boutique adventure organizer driven by intimate hospitality, profound indigenous heritage, and ecological respect.'}
          </p>
        </div>
      </section>

      {/* 2. OUR ETHOS & PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#EAE6DF] shadow-[0_4px_30px_-5px_rgba(27,67,50,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-[#C86D51] tracking-wider uppercase">
              {t.whyUs.ethosTag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17231C] leading-snug">
              {t.whyUs.ethosTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#4A554E] leading-relaxed">
              {t.whyUs.ethosText}
            </p>

            <div className="pt-2 space-y-3">
              {t.whyUs.ethosPillars.map((p, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#1B4332]">
                  <Leaf className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#EAE6DF]">
              <img
                src="https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1000&q=80"
                alt="Local Village Connection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-[#1B4332] text-white p-4 rounded-2xl shadow-xl max-w-xs text-xs space-y-1 hidden sm:block">
              <span className="font-black text-[#D4A373] text-sm block">100% Pemandu Lokal</span>
              <p className="text-[#EAE6DF]">Pendapatan tour langsung berputar di desa dan komunitas setempat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 PILARS OF SERVICE EXCELLENCE */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#1B4332] tracking-wider uppercase">
            STANDAR KUALITAS KAMI
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
            Mengapa Traveler Nyaman Bersama Kami
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.whyUs.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-2xl font-black text-[#D4A373]">{pillar.num}</span>
                <h4 className="text-lg font-bold text-[#17231C] mt-2">{pillar.title}</h4>
                <p className="text-xs text-[#4A554E] leading-relaxed mt-2">{pillar.description}</p>
              </div>

              <div className="pt-4 border-t border-[#EAE6DF] flex items-center gap-1.5 text-xs font-semibold text-[#1B4332]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Terjamin & Konsisten</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OFFICIAL LEGAL LICENSES & CERTIFICATIONS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <div className="relative overflow-hidden bg-[#17231C] text-white rounded-3xl p-8 sm:p-12 border border-[#1B4332]/50 shadow-2xl">
          {/* Layer Aurora Background (Paling Belakang) */}
          <div className="absolute inset-0 pointer-events-none opacity-70 z-0 overflow-hidden">
            <GhostFibers
              lineColor="#042F24"
              glowColor="#10B981"
              speed={0.18}
              scale={2.2}
              layers={5}
              waveFrequency={2.8}
              waveAmplitude={0.02}
              brightness={1.7}
              dpr={1}
              fps={60}
            />
          </div>

          <div className="relative z-10 max-w-2xl mb-8 space-y-2">
            <span className="text-xs font-bold text-[#D4A373] tracking-wider uppercase">
              LEGALITAS RESMI PEMERINTAH
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Biro Perjalanan Wisata Resmi & Terpercaya
            </h3>
            <p className="text-xs sm:text-sm text-[#859088]">
              Semua operasional kami berada di bawah pengawasan regulasi pariwisata Republik Indonesia demi perlindungan penuh bagi setiap traveler.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-4"
              >
                <FileCheck className="w-6 h-6 text-[#D4A373] flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <span className="text-xs font-semibold text-[#D4A373] block">{item.number}</span>
                  <p className="text-xs text-[#859088] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
        <div className="bg-[#F5F2EB] rounded-3xl p-8 sm:p-10 border border-[#EAE6DF] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold text-[#17231C]">
              {lang === 'id' ? 'Siap Merasakan Pengalaman Nyata Ini?' : 'Ready to Experience Real Indonesia?'}
            </h4>
            <p className="text-xs text-[#4A554E]">
              {lang === 'id'
                ? 'Jelajahi pilihan paket terkurasi kami atau chat langsung tim reservasi kami.'
                : 'Browse our curated tour packages or chat directly with our reservations desk.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/paket-wisata"
              className="px-6 py-3 bg-[#1B4332] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:bg-[#20503c] transition-all"
            >
              {t.nav.packages}
            </Link>
            <Link
              to="/kontak"
              className="px-6 py-3 bg-white text-[#17231C] text-xs sm:text-sm font-bold rounded-xl border border-[#EAE6DF] hover:bg-slate-50 transition-all"
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

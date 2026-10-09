import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Car, Award, Camera, Star } from 'lucide-react';
import Hero from '../components/Hero';
import TripCard from '../components/TripCard';
import AccordionGallery from '../components/AccordionGallery';
import { TOUR_PACKAGES } from '../data/trips';
import { FLEET_VEHICLES } from '../data/fleet';
import { TESTIMONIALS, COMMUNITY_GALLERY } from '../data/testimonials';
import { formatRupiah, generateWhatsAppRentalUrl } from '../utils/formatters';
import FlowingMenu from '../components/FlowingMenu';

const destinationItems = [
  {
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=85',
    label: 'Labuan Bajo & Komodo',
    link: '/destinasi'
  },
  {
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=85',
    label: 'Bromo & Kawah Ijen',
    link: '/destinasi'
  },
  {
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=85',
    label: 'Danau Toba & Harau',
    link: '/destinasi'
  },
  {
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85',
    label: 'Kepulauan Derawan',
    link: '/destinasi'
  },
  {
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=85',
    label: 'Raja Ampat Papua',
    link: '/destinasi'
  }
];

export default function Home({ t, lang, onSelectTrip }) {
  // Preview packages: first 3
  const previewPackages = TOUR_PACKAGES.slice(0, 3);
  // Preview fleet: first 2
  const previewFleet = FLEET_VEHICLES.slice(0, 2);

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <Hero t={t} lang={lang} />

      {/* 2. DESTINASI POPULER SECTION */}
      <section className="relative py-20 md:py-24 bg-[#F5F2EB] overflow-hidden border-b border-[#EAE6DF]">
        {/* Subtle SVG Topography Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.06] pointer-events-none select-none">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-[#1B4332]" strokeWidth="1.5">
            <path d="M 50 150 Q 150 50 250 120 T 380 90" />
            <path d="M 20 200 Q 130 90 270 170 T 390 140" />
            <circle cx="280" cy="180" r="45" strokeDasharray="3 3" />
            <circle cx="280" cy="180" r="90" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
          {/* Header with Title and "Lihat Semua" Link */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
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

            <Link
              to="/destinasi"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1B4332] hover:text-[#2D6A4F] bg-white px-5 py-2.5 rounded-xl border border-[#EAE6DF] shadow-xs transition-all hover:translate-x-1"
            >
              <span>{t.destinations.viewAll}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Accordion Gallery dari React Bits */}
          <div className="w-full">
            <AccordionGallery
              items={destinationItems}
              defaultIndex={1}
              height={500}
              radius={24}
              gap={12}
              expandRatio={0.52}
              accentColor="#D4A373"
              overlayColor="#071911"
              trigger="hover"
            />
          </div>
        </div>
      </section>

      {/* 3. ANGKA PENCAPAIAN — COMPANY METRICS */}
      <section className="relative py-16 md:py-20 bg-[#17231C] overflow-hidden">
        {/* Subtle texture / pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#D4A373" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
          {/* Section Label */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 bg-[#D4A373]/15 text-[#D4A373] border border-[#D4A373]/30 text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase mb-4">
              <Award className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Pencapaian Kami</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF8F5] tracking-tight mt-2">
              Dipercaya Ribuan Wisatawan Nusantara
            </h2>
          </div>

          {/* 4 Metric Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: '500+', label: 'Trip Selesai', sub: 'Open & Private Tour' },
              { value: '98%', label: 'Tamu Puas Bintang 5', sub: 'Rating Google & Ulasan' },
              { value: '45', label: 'Pemandu Mitra Lokal', sub: 'Berlisensi HPI Nasional' },
              { value: '100%', label: 'Berangkat Tanpa Cancel', sub: 'Jaminan Keberangkatan' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative text-center px-6 py-8 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.09] hover:border-[#D4A373]/40 transition-all duration-300"
              >
                <div className="text-4xl sm:text-5xl font-black text-[#D4A373] leading-none mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-[#FAF8F5] leading-snug mb-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#859088] font-medium tracking-wide">
                  {stat.sub}
                </div>
                {/* Subtle accent bar */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#D4A373]/50 rounded-full group-hover:w-16 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PAKET WISATA POPULER */}
      <section className="relative py-20 md:py-24 bg-white overflow-hidden border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-[#D4A373]/15 text-[#C86D51] border border-[#D4A373]/30 text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>{t.packages.tag}</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C] tracking-tight font-sans">
                {t.packages.title}
              </h2>
              <p className="text-[#4A554E] text-base leading-relaxed">
                {t.packages.subtitle}
              </p>
            </div>

            <Link
              to="/paket-wisata"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#FAF8F5] bg-[#1B4332] hover:bg-[#20503c] px-6 py-3 rounded-xl shadow-md transition-all hover:translate-x-1"
            >
              <span>{t.packages.allPackages}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {previewPackages.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onSelectTrip={onSelectTrip}
                t={t}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. RENTAL ARMADA PREVIEW SECTION */}
      <section className="relative py-20 md:py-24 bg-[#F5F2EB] overflow-hidden border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-[#1B4332]/10 text-[#1B4332] border border-[#1B4332]/20 text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
                <Car className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>{t.fleet.tag}</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C] tracking-tight font-sans">
                {t.fleet.title}
              </h2>
              <p className="text-[#4A554E] text-base leading-relaxed">
                {t.fleet.subtitle}
              </p>
            </div>

            <Link
              to="/rental-armada"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1B4332] hover:text-[#2D6A4F] bg-white px-5 py-2.5 rounded-xl border border-[#EAE6DF] shadow-xs transition-all hover:translate-x-1"
            >
              <span>{t.fleet.viewAllFleet}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {previewFleet.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row"
              >
                <div className="sm:w-2/5 relative h-56 sm:h-auto overflow-hidden bg-slate-100">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#17231C]/80 text-[#FAF8F5] text-xs px-2.5 py-1 rounded-md font-semibold backdrop-blur-sm">
                    {vehicle.seats}
                  </span>
                </div>

                <div className="sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#17231C]">{vehicle.name}</h3>
                    <p className="text-xs text-[#C86D51] font-semibold mt-0.5">{vehicle.tagline}</p>
                    <p className="text-xs text-[#4A554E] mt-2 line-clamp-2 leading-relaxed">
                      {vehicle.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EAE6DF] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#859088] block">{t.fleet.dailyRate}</span>
                      <span className="text-xl font-bold text-[#1B4332] tabular-nums">
                        {formatRupiah(vehicle.dailyRate)}
                      </span>
                      <span className="text-xs text-[#859088]"> {t.fleet.perDay}</span>
                    </div>

                    <a
                      href={generateWhatsAppRentalUrl(vehicle.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                    >
                      {t.fleet.rentAction}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. KENAPA KAMI (EDITORIAL SUMMARY) */}
      <section className="relative py-20 md:py-24 bg-white overflow-hidden border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-flex items-center gap-1.5 bg-[#1B4332]/10 text-[#1B4332] border border-[#1B4332]/20 text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
                <Award className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>{t.whyUs.ethosTag}</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C] tracking-tight leading-tight">
                {t.whyUs.ethosTitle}
              </h2>

              <p className="text-[#4A554E] text-sm sm:text-base leading-relaxed">
                {t.whyUs.ethosText}
              </p>

              <div className="pt-2 space-y-2">
                {t.whyUs.ethosPillars.map((pillar, i) => (
                  <div key={i} className="text-xs sm:text-sm font-semibold text-[#1B4332] flex items-center gap-2">
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/kenapa-kami"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1B4332] hover:text-[#2D6A4F] bg-[#F5F2EB] px-6 py-3 rounded-xl border border-[#EAE6DF] transition-all hover:translate-x-1"
                >
                  <span>{t.whyUs.learnMore}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.whyUs.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAFAF7] p-6 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:border-[#1B4332]/30 transition-all space-y-2"
                >
                  <span className="text-xs font-black text-[#D4A373] tracking-widest">{pillar.num}</span>
                  <h4 className="text-base font-bold text-[#17231C]">{pillar.title}</h4>
                  <p className="text-xs text-[#4A554E] leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. RUTE PETUALANGAN UNGGULAN — FlowingMenu Section */}
      <section className="relative bg-[#17231C] overflow-hidden">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-16 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-[#D4A373]/15 text-[#D4A373] border border-[#D4A373]/30 text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
                <Compass className="w-3.5 h-3.5" />
                <span>Rute Eksklusif Nusantara</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF8F5] tracking-tight">
                Rute Petualangan Unggulan
              </h2>
              <p className="text-[#859088] text-sm sm:text-base max-w-xl leading-relaxed">
                Hover setiap rute untuk melihat cuplikan destinasinya — lalu klik untuk lihat paket lengkap.
              </p>
            </div>
            <Link
              to="/paket-wisata"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#17231C] bg-[#D4A373] hover:bg-[#c8944a] px-5 py-2.5 rounded-xl shadow-md transition-all hover:translate-x-1 shrink-0"
            >
              <span>Semua Paket</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FlowingMenu interactive component */}
        <div
          className="w-full"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            lineHeight: 1.15,
          }}
        >
          <FlowingMenu
            items={[
              {
                text: 'Sailing Phinisi Komodo',
                link: '/paket-wisata',
                image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
              },
              {
                text: 'Bromo Sunrise & Savana',
                link: '/paket-wisata',
                image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
              },
              {
                text: 'Heritage Minang & Harau',
                link: '/paket-wisata',
                image: 'https://images.unsplash.com/photo-1559628233-100c798642d5?auto=format&fit=crop&w=800&q=80',
              },
              {
                text: 'Derawan Underwater Secret',
                link: '/paket-wisata',
                image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
              },
            ]}
          />
        </div>

        {/* Separator line */}
        <div className="border-t border-white/10 mt-10" />
      </section>

      {/* 7. TESTIMONIALS & GALERI PREVIEW */}
      <section className="relative py-20 md:py-24 bg-[#F5F2EB] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-[#C86D51]/10 text-[#C86D51] border border-[#C86D51]/20 text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
                <Camera className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>{t.gallery.galleryTag}</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C] tracking-tight font-sans">
                {t.gallery.galleryTitle}
              </h2>
              <p className="text-[#4A554E] text-base leading-relaxed">
                {t.gallery.gallerySubtitle}
              </p>
            </div>

            <Link
              to="/galeri"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1B4332] hover:text-[#2D6A4F] bg-white px-5 py-2.5 rounded-xl border border-[#EAE6DF] shadow-xs transition-all hover:translate-x-1"
            >
              <span>{t.gallery.viewAllGallery}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-[#EAE6DF] shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A554E] italic leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[#EAE6DF]">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-[#17231C]">{item.name}</h5>
                    <span className="text-[11px] text-[#859088]">{item.city} • {item.trip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Photo Gallery Grid 6 Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {COMMUNITY_GALLERY.map((img) => (
              <div
                key={img.id}
                className="relative aspect-square rounded-xl overflow-hidden group shadow-2xs"
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[10px] text-white font-medium truncate">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

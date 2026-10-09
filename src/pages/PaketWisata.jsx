import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, Compass, MessageCircle, RotateCcw, ShieldCheck } from 'lucide-react';
import TripCard from '../components/TripCard';
import { TOUR_PACKAGES } from '../data/trips';
import { generateGeneralWhatsAppUrl } from '../utils/formatters';

export default function PaketWisata({ t, lang, onSelectTrip }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: t.packages.categories.all },
    { id: 'bahari', label: t.packages.categories.bahari },
    { id: 'gunung', label: t.packages.categories.gunung },
    { id: 'heritage', label: t.packages.categories.heritage },
  ];

  const filteredTrips = useMemo(() => {
    return TOUR_PACKAGES.filter((trip) => {
      const matchesCat =
        activeCategory === 'all' || trip.category === activeCategory;
      const matchesSearch =
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-24 pb-20 overflow-hidden bg-[#FAF8F5]">
      {/* 1. PAGE HEADER & BREADCRUMB */}
      <section className="relative py-14 sm:py-20 bg-[#17231C] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#17231C] via-[#17231C]/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 text-center sm:text-left">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-[#D4A373] uppercase tracking-wider mb-4">
            <Link to="/" className="hover:underline text-[#EAE6DF]">
              {lang === 'id' ? 'Beranda' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-[#D4A373]">{t.nav.packages}</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest text-[#D4A373] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>{t.packages.tag}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-white max-w-3xl mb-4">
            {t.packages.title}
          </h1>

          <p className="text-sm sm:text-base text-[#EAE6DF] max-w-2xl leading-relaxed">
            {t.packages.subtitle}
          </p>
        </div>
      </section>

      {/* 2. FILTER CONTROLS & SEARCH */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE6DF] shadow-xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#4A554E] hover:bg-[#EAE6DF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-[#859088] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.packages.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-xs sm:text-sm text-[#17231C] placeholder:text-[#859088] focus:outline-none focus:border-[#1B4332] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#859088] hover:text-[#17231C]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Count indicator */}
        <div className="pt-4 flex items-center justify-between text-xs text-[#859088]">
          <span>
            {lang === 'id'
              ? `Menampilkan ${filteredTrips.length} dari ${TOUR_PACKAGES.length} paket tour aktif`
              : `Showing ${filteredTrips.length} of ${TOUR_PACKAGES.length} active tour packages`}
          </span>

          {(activeCategory !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1 text-[#C86D51] font-semibold hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.packages.filterReset}</span>
            </button>
          )}
        </div>
      </section>

      {/* 3. TOUR PACKAGES GRID */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-6">
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onSelectTrip={onSelectTrip}
                t={t}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE6DF] max-w-lg mx-auto my-8 space-y-4">
            <Compass className="w-12 h-12 text-[#D4A373] mx-auto opacity-70" />
            <h4 className="text-lg font-bold text-[#17231C]">
              {t.packages.noResults}
            </h4>
            <p className="text-xs text-[#859088]">
              {lang === 'id'
                ? 'Coba ganti kata kunci pencarian atau reset filter kategori untuk melihat semua paket.'
                : 'Try altering your search keywords or reset categories to view all tours.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#1B4332] text-white text-xs font-bold rounded-xl"
            >
              {t.packages.filterReset}
            </button>
          </div>
        )}
      </section>

      {/* 4. CUSTOM TRIP CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-12 pb-6">
        <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4A373] tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
              <span>{lang === 'id' ? 'CUSTOM PRIVATE TRIP' : 'CUSTOM PRIVATE TRIP'}</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'id'
                ? 'Punya Tanggal Liburan Sendiri atau Ingin Rute Kustom?'
                : 'Have Specific Travel Dates or Custom Itinerary in Mind?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#EAE6DF] leading-relaxed">
              {lang === 'id'
                ? 'Kami bisa merancang rute privat khusus keluarga, honeymoon, reuni alumni, ataupun gathering kantor dengan fasilitas yang disesuaikan anggaran Anda.'
                : 'We design bespoke private trips for families, honeymoons, corporate retreats, and friend groups matching your exact budget and pacing.'}
            </p>
          </div>

          <a
            href={generateGeneralWhatsAppUrl(
              lang === 'id'
                ? 'Halo Admin NusantaraVista, saya ingin merancang jadwal private tour kustom untuk rombongan saya.'
                : 'Hello NusantaraVista, I would like to design a custom private trip for my group.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>{lang === 'id' ? 'Konsultasi Rute Kustom' : 'Chat Custom Specialist'}</span>
          </a>
        </div>
      </section>
    </div>
  );
}

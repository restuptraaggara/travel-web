import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Calendar, Plane, CheckCircle2, ArrowRight, MessageCircle, Sparkles, MapPin } from 'lucide-react';
import { FEATURED_DESTINATIONS } from '../data/destinations';
import { generateGeneralWhatsAppUrl } from '../utils/formatters';

export default function Destinasi({ t, lang }) {
  return (
    <div className="pt-24 pb-20 overflow-hidden bg-[#FAF8F5]">
      {/* 1. PAGE HEADER & BREADCRUMB */}
      <section className="relative py-14 sm:py-20 bg-[#17231C] text-white overflow-hidden">
        {/* Ambient Nature Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=2000&q=80"
            alt="Nature Background"
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
            <span className="text-[#D4A373]">{t.nav.destinations}</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest text-[#D4A373] uppercase mb-4">
            <Compass className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>{t.destinations.tag}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-white max-w-3xl mb-4">
            {lang === 'id'
              ? 'Jelajahi 4 Wilayah Eksotis Indonesia'
              : 'Explore 4 Exotic Regions of Indonesia'}
          </h1>

          <p className="text-sm sm:text-base text-[#EAE6DF] max-w-2xl leading-relaxed">
            {lang === 'id'
              ? 'Dari kaldera dan tebing granit megah Sumatera, surga bahari komodo, keajaiban lautan pasir Bromo, hingga kepulauan perawan Derawan. Seluruh rute dipandu oleh penduduk lokal asli.'
              : 'From majestic granite cliffs in Sumatra, pristine waters of Komodo, mystical Bromo sands, to secluded Derawan islands. Every journey is guided by certified local natives.'}
          </p>
        </div>
      </section>

      {/* 2. REGIONAL DESTINATION SHOWCASE (EDITORIAL CARDS) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="space-y-16">
          {FEATURED_DESTINATIONS.map((dest, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={dest.id}
                id={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className={`bg-white rounded-3xl overflow-hidden border border-[#EAE6DF] shadow-[0_4px_25px_-5px_rgba(27,67,50,0.06)] flex flex-col ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-stretch`}
              >
                {/* Visual Image Half */}
                <div className="lg:w-1/2 relative min-h-[320px] lg:min-h-[440px] overflow-hidden group">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:hidden" />

                  {/* Badges on image */}
                  <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                    <span className="bg-[#17231C]/85 backdrop-blur-md text-[#FAF8F5] text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
                      {dest.badge}
                    </span>
                    <span className="bg-[#1B4332] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {dest.packageCount}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 text-white lg:hidden">
                    <span className="text-xs text-[#D4A373] font-semibold">{dest.region}</span>
                    <h3 className="text-2xl font-bold">{dest.name}</h3>
                  </div>
                </div>

                {/* Content Half */}
                <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="hidden lg:block">
                      <span className="text-xs font-bold text-[#C86D51] tracking-wider uppercase">
                        {dest.region}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17231C] tracking-tight mt-1">
                        {dest.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#859088] mt-1">{dest.subtitle}</p>
                    </div>

                    <p className="text-sm text-[#4A554E] leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Operational Metrics (Season & Airport) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-[#EAE6DF] text-xs">
                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#17231C] block">
                            {t.destinations.bestSeason}
                          </span>
                          <span className="text-[#859088]">{dest.bestSeason}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Plane className="w-4 h-4 text-[#1B4332] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#17231C] block">
                            {t.destinations.airportAccess}
                          </span>
                          <span className="text-[#859088]">{dest.airport}</span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights Points */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#17231C] uppercase tracking-wider block">
                        {t.destinations.highlightsTitle}
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#4A554E]">
                        {dest.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332] flex-shrink-0" />
                            <span className="font-medium truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      to="/paket-wisata"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#FAF8F5] bg-[#1B4332] hover:bg-[#20503c] transition-all cursor-pointer shadow-xs"
                    >
                      <span>{t.destinations.viewPackagesForRegion}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <a
                      href={generateGeneralWhatsAppUrl(
                        lang === 'id'
                          ? `Halo Admin NusantaraVista, saya ingin konsultasi rencana tour ke kawasan ${dest.name}.`
                          : `Hello NusantaraVista, I'd like to ask about tour packages in ${dest.name}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-[#1B4332] bg-[#FAF8F5] hover:bg-white border border-[#EAE6DF] transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>{lang === 'id' ? 'Tanya Admin' : 'Consult via WA'}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. ETHICAL TRAVEL & COMMUNITY PROMISE */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <div className="bg-[#F5F2EB] rounded-3xl p-8 sm:p-12 border border-[#EAE6DF] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              <span>{lang === 'id' ? 'STANDAR PERJALANAN ETIS' : 'ETHICAL TRAVEL STANDARD'}</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
              {lang === 'id'
                ? 'Tidak Ada Perantara. Langsung Bersama Putra Daerah.'
                : 'No Middlemen. Directly Led by Local Natives.'}
            </h3>
            <p className="text-sm text-[#4A554E] leading-relaxed">
              {lang === 'id'
                ? 'Semua jadwal kami disusun dengan memperhatikan kearifan lokal, jam operasional kawasan adat, serta pelestarian ekosistem laut dan gunung tanpa jejak sampah (Leave No Trace).'
                : 'All itineraries respect indigenous traditions, local cultural hours, and strict leave-no-trace ecological conservation.'}
            </p>
          </div>

          <Link
            to="/kenapa-kami"
            className="whitespace-nowrap px-6 py-3.5 bg-white hover:bg-slate-50 text-[#17231C] font-bold text-sm rounded-xl border border-[#EAE6DF] shadow-xs transition-all"
          >
            {lang === 'id' ? 'Lihat Sertifikasi & Nilai Kami' : 'View Certifications & Values'}
          </Link>
        </div>
      </section>
    </div>
  );
}

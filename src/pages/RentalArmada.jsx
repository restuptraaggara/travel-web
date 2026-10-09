import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Users, Briefcase, Wind, CheckCircle2, ShieldCheck, MessageCircle, FileText, Sparkles, Fuel } from 'lucide-react';
import { FLEET_VEHICLES } from '../data/fleet';
import { formatRupiah, generateWhatsAppRentalUrl } from '../utils/formatters';

export default function RentalArmada({ t, lang }) {
  const [selectedVehicleId, setSelectedVehicleId] = useState(FLEET_VEHICLES[0].id);

  const activeVehicle =
    FLEET_VEHICLES.find((v) => v.id === selectedVehicleId) || FLEET_VEHICLES[0];

  return (
    <div className="pt-24 pb-20 overflow-hidden bg-[#FAF8F5]">
      {/* 1. PAGE HEADER & BREADCRUMB */}
      <section className="relative py-14 sm:py-20 bg-[#17231C] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=80"
            alt="Fleet Background"
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
            <span className="text-[#D4A373]">{t.nav.rental}</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest text-[#D4A373] uppercase mb-4">
            <Car className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>{t.fleet.tag}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-white max-w-3xl mb-4">
            {t.fleet.title}
          </h1>

          <p className="text-sm sm:text-base text-[#EAE6DF] max-w-2xl leading-relaxed">
            {t.fleet.subtitle}
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE VEHICLE TAB SWITCHER & HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-10">
          {FLEET_VEHICLES.map((vehicle) => {
            const isSelected = vehicle.id === activeVehicle.id;
            return (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => setSelectedVehicleId(vehicle.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md'
                    : 'bg-white text-[#4A554E] border-[#EAE6DF] hover:bg-[#F5F2EB]'
                }`}
              >
                <Car className={`w-4 h-4 ${isSelected ? 'text-[#D4A373]' : 'text-[#859088]'}`} />
                <span>{vehicle.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#859088]'}`}>
                  {vehicle.seats}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Vehicle Showcase Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVehicle.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl overflow-hidden border border-[#EAE6DF] shadow-[0_10px_35px_-5px_rgba(27,67,50,0.08)] grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Visual Photo (Col 1-5) */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-slate-900 overflow-hidden">
              <img
                src={activeVehicle.image}
                alt={activeVehicle.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-semibold text-[#D4A373] uppercase tracking-wider block">
                  {activeVehicle.tagline}
                </span>
                <h3 className="text-2xl font-black">{activeVehicle.name}</h3>
                <p className="text-xs text-[#EAE6DF] line-clamp-2">
                  {activeVehicle.description}
                </p>
              </div>
            </div>

            {/* Specifications & Inclusions (Col 6-12) */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* Rate & Rent CTA Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE6DF]">
                  <div>
                    <span className="text-xs text-[#859088] font-medium block">
                      {t.fleet.dailyRate}
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-extrabold text-[#1B4332] tabular-nums">
                        {formatRupiah(activeVehicle.dailyRate)}
                      </span>
                      <span className="text-xs text-[#859088] font-semibold">{t.fleet.perDay}</span>
                    </div>
                    <span className="text-[11px] text-[#C86D51] font-semibold block mt-1">
                      ✦ {activeVehicle.priceNote}
                    </span>
                  </div>

                  <a
                    href={generateWhatsAppRentalUrl(activeVehicle.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{t.fleet.rentAction}</span>
                  </a>
                </div>

                {/* Technical Specifications Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#17231C] uppercase tracking-wider">
                    {t.fleet.specifications}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {activeVehicle.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="bg-[#FAFAF7] p-3 rounded-xl border border-[#EAE6DF] flex flex-col"
                      >
                        <span className="text-[11px] text-[#859088] font-medium">{spec.label}</span>
                        <span className="text-xs font-bold text-[#17231C] mt-0.5">{spec.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Inclusions */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#17231C] uppercase tracking-wider">
                    {t.fleet.includedTitle}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A554E]">
                    {activeVehicle.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#1B4332] flex-shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Maintenance Guarantee Footnote */}
              <div className="pt-4 border-t border-[#EAE6DF] flex items-center gap-2.5 text-xs text-[#859088]">
                <ShieldCheck className="w-4 h-4 text-[#1B4332] flex-shrink-0" />
                <span>{t.fleet.guaranteeText}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 3. SIDE-BY-SIDE ALL FLEET GRID */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#17231C] mb-6">
          {lang === 'id' ? 'Seluruh Pilihan Armada NusantaraVista' : 'All NusantaraVista Fleet Vehicles'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLEET_VEHICLES.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/70 text-white text-[11px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                  {item.seats}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-bold text-base text-[#17231C]">{item.name}</h4>
                  <p className="text-xs text-[#859088] line-clamp-2 mt-1">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-[#EAE6DF]">
                  <span className="text-[10px] text-[#859088] block">Mulai dari</span>
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="text-lg font-bold text-[#1B4332] tabular-nums">
                      {formatRupiah(item.dailyRate)}
                    </span>
                    <span className="text-xs text-[#859088]">/hari</span>
                  </div>

                  <a
                    href={generateWhatsAppRentalUrl(item.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-3 py-2 bg-[#FAF8F5] hover:bg-[#1B4332] text-[#1B4332] hover:text-white border border-[#1B4332]/20 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Pesan via WA</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. RENTAL TERMS & RULES SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
        <div className="bg-[#F5F2EB] rounded-3xl p-8 sm:p-12 border border-[#EAE6DF]">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[#1B4332]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#17231C]">
              {t.fleet.rentalTerms}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#4A554E] leading-relaxed">
            {t.fleet.terms.map((term, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/70 p-4 rounded-xl border border-[#EAE6DF]">
                <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                  {i + 1}
                </span>
                <span>{term}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

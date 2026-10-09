import React, { useState } from 'react';
import { Users, Briefcase, Wind, Check, MessageCircle, Car, ShieldCheck, Sparkles, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FLEET_VEHICLES } from '../data/fleet';
import { formatRupiah, generateWhatsAppRentalUrl } from '../utils/formatters';

export default function FleetRental({ t, lang }) {
  const [selectedFleetId, setSelectedFleetId] = useState(FLEET_VEHICLES[0].id);

  const activeVehicle = FLEET_VEHICLES.find((v) => v.id === selectedFleetId) || FLEET_VEHICLES[0];

  const specIcons = [Users, Briefcase, Wind, Sparkles];

  return (
    <section id="rental-armada" className="py-20 md:py-24 bg-[#EEF3EF] border-t border-[#EAE6DF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header with Category Badge */}
        <div className="max-w-3xl mb-12 space-y-3">
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

        {/* Tab Switcher Horizontal */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {FLEET_VEHICLES.map((vehicle) => {
            const isActive = vehicle.id === activeVehicle.id;
            return (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => setSelectedFleetId(vehicle.id)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm scale-[1.02]'
                    : 'bg-white text-[#4A554E] hover:text-[#17231C] border-[#EAE6DF] hover:bg-[#FAF8F5]'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>{vehicle.name}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Vehicle Showcase Card using AnimatePresence */}
        <div className="bg-white rounded-3xl border border-[#EAE6DF] shadow-warm-card overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVehicle.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10"
            >
              {/* Left Column: Modern Vehicle Image with Studio Radial Glow */}
              <div className="lg:col-span-6 relative">
                {/* Radial Glow Element for Realistic Studio Depth */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1B4332]/20 via-[#1B4332]/5 to-transparent blur-2xl pointer-events-none -z-0" />

                <div className="relative z-10 rounded-3xl overflow-hidden aspect-[16/10] bg-gradient-to-tr from-[#FAF8F5] via-[#E2EFE7]/80 to-white border border-[#EAE6DF] p-4 flex items-center justify-center shadow-inner">
                  <img
                    src={activeVehicle.image}
                    alt={activeVehicle.name}
                    className="w-full h-full object-cover object-center rounded-2xl shadow-sm"
                  />
                  
                  {/* Floating Seats Badge */}
                  <div className="absolute top-6 left-6 bg-[#17231C]/85 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1 rounded-full border border-white/10 shadow-sm">
                    {activeVehicle.seats}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-[#859088]">
                  <ShieldCheck className="w-4 h-4 text-[#1B4332] flex-shrink-0" />
                  <span>{t.fleet.guaranteeText}</span>
                </div>
              </div>

              {/* Right Column: Specs, Inclusions & Action Button */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#C86D51] tracking-wider uppercase block mb-1">
                    {activeVehicle.tagline}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
                    {activeVehicle.name}
                  </h3>
                  <p className="text-sm text-[#4A554E] leading-relaxed mt-2">
                    {activeVehicle.description}
                  </p>
                </div>

                {/* 4 Specs Grouped with Modern Icons */}
                <div className="grid grid-cols-2 gap-3.5">
                  {activeVehicle.specs.map((s, idx) => {
                    const IconComponent = specIcons[idx] || Sparkles;
                    return (
                      <div
                        key={idx}
                        className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EAE6DF] flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-white border border-[#EAE6DF] text-[#1B4332] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[11px] text-[#859088] font-medium block">
                            {s.label}
                          </span>
                          <span className="text-xs font-bold text-[#17231C]">
                            {s.val}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Inclusions List */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#17231C] uppercase tracking-wider block">
                    {t.fleet.includedTitle}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A554E]">
                    {activeVehicle.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#1B4332] flex-shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & WhatsApp Rental CTA */}
                <div className="pt-4 border-t border-[#EAE6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-[#859088] font-medium block">
                      {t.fleet.dailyRate}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-bold text-[#1B4332] tabular-nums">
                        {formatRupiah(activeVehicle.dailyRate)}
                      </span>
                      <span className="text-xs text-[#859088] font-normal">{t.fleet.perDay}</span>
                    </div>
                    <span className="text-[11px] text-[#859088]">{activeVehicle.priceNote}</span>
                  </div>

                  <a
                    href={generateWhatsAppRentalUrl(activeVehicle.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-md active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{t.fleet.rentAction}</span>
                  </a>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

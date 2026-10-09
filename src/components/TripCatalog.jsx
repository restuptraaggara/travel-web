import React from 'react';
import { Compass } from 'lucide-react';
import TripCard from './TripCard';

export default function TripCatalog({ trips, onSelectTrip, t, lang }) {
  return (
    <section id="paket-wisata" className="py-20 md:py-24 bg-white border-t border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header with Category Badge */}
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-[#1B4332]/10 text-[#1B4332] border border-[#1B4332]/20 text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>{t.packages.tag}</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C] tracking-tight font-sans">
            {t.packages.title}
          </h2>

          <p className="text-[#4A554E] text-base leading-relaxed">
            {t.packages.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trips.map((trip) => (
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
  );
}

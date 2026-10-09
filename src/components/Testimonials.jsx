import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

export default function Testimonials() {
  return (
    <section id="cerita-perjalanan" className="py-20 md:py-24 bg-[#FAF8F5] border-t border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#C86D51] uppercase">
            CERITA DARI JALAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C] tracking-tight font-sans">
            Catatan Para Pejalan
          </h2>
          <p className="text-[#4A554E] text-base leading-relaxed">
            Kesan jujur dari mereka yang telah merasakan kehangatan keramahan lokal dan keheningan lanskap nusantara bersama kami.
          </p>
        </div>

        {/* Testimonials 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-8 border border-[#EAE6DF] shadow-warm-card flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#D4A373]/50 mb-4" />
                <p className="text-sm text-[#4A554E] leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE6DF]">
                <h4 className="font-bold text-sm text-[#17231C]">{t.name}</h4>
                <p className="text-xs text-[#859088] mt-0.5">{t.city} • {t.date}</p>
                <span className="inline-block mt-2 text-[11px] font-medium text-[#1B4332] bg-[#F2F7F4] px-2 py-0.5 rounded">
                  {t.trip}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

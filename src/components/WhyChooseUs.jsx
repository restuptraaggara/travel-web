import React from 'react';
import { Award, Users, Receipt, Headphones, Sparkles, CheckCircle2, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUs({ t, lang }) {
  const iconList = [Award, Users, Receipt, Headphones];

  return (
    <section id="kenapa-kami" className="relative py-24 md:py-28 bg-[#1B4332] text-white overflow-hidden border-t border-[#153628]">
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Filosofi Perjalanan Lokal (Elegant Editorial Story Box) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-b border-white/15 pb-16 mb-16"
        >
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-[#D4A373] border border-white/20 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{t.whyUs.ethosTag}</span>
            </span>

            {/* Humanist Editorial Quote Header */}
            <div className="flex items-start gap-4 pt-1">
              <Quote className="w-10 h-10 text-[#D4A373] flex-shrink-0 mt-1 opacity-70" />
              <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-[#FAF8F5] leading-snug italic">
                "{t.whyUs.ethosTitle}"
              </blockquote>
            </div>

            <p className="text-emerald-100/90 text-base sm:text-lg leading-relaxed pt-2">
              {t.whyUs.ethosText}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#D4A373]">
              {t.whyUs.ethosPillars.map((p, idx) => (
                <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 4 Alasan Memilih Kami: 4 Luxurious Dark Glass Containers */}
        <div>
          <div className="max-w-2xl mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-[#D4A373] border border-white/20 text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{t.whyUs.serviceTag}</span>
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              4 Alasan Traveler Memilih{' '}
              <span className="text-[#D4A373]">NusantaraVista</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.whyUs.pillars.map((pillar, idx) => {
              const IconComp = iconList[idx] || Award;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 rounded-2xl p-6 sm:p-7 hover:bg-white/15 transition-all flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Icon Container with Warm Gold Glow */}
                    <div className="w-13 h-13 rounded-2xl bg-white/15 border border-white/20 text-[#D4A373] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#D4A373] group-hover:text-[#17231C] transition-all duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h4 className="text-xl font-bold text-white mb-2.5 leading-snug">
                      {pillar.title}
                    </h4>

                    <p className="text-sm text-emerald-100/80 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 text-xs text-[#D4A373] font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A373]" />
                    <span>NusantaraVista Guarantee</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

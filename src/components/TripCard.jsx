import React from 'react';
import { MapPin, Clock, Users, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatRupiah, generateWhatsAppBookingUrl } from '../utils/formatters';

export default function TripCard({ trip, onSelectTrip, t, lang }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group bg-[#FAFAF7] rounded-2xl overflow-hidden border border-[#EAE6DF] shadow-[0_10px_30px_-5px_rgba(27,67,50,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_40px_-5px_rgba(27,67,50,0.15)] transition-all duration-300 flex flex-col h-full"
    >
      {/* 4:3 Aspect Ratio Image Thumbnail with Smooth Zoom on Hover */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE6DF]">
        <img
          src={trip.image}
          alt={trip.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

        {/* Top-left: Location tag */}
        <div className="absolute top-3.5 left-3.5 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#17231C]/80 backdrop-blur-md text-[#FAF8F5] border border-white/10 shadow-sm">
            <MapPin className="w-3 h-3 text-[#D4A373]" />
            <span>{trip.location}</span>
          </span>
        </div>

        {/* Top-right: Warm terracotta badge "Sisa 2 Kursi" */}
        {trip.remainingSeats && (
          <div className="absolute top-3.5 right-3.5 pointer-events-none z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C86D51] text-white shadow-md border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>{lang === 'id' ? `Sisa ${trip.remainingSeats} Kursi` : `${trip.remainingSeats} Seats Left`}</span>
            </span>
          </div>
        )}

        {/* Bottom Image Overlay: Duration tag & Capacity */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-black/60 backdrop-blur-md text-[#EAE6DF]">
            <Clock className="w-3 h-3 text-[#D4A373]" />
            <span>{trip.duration}</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#1B4332]/90 backdrop-blur-md text-white">
            <Users className="w-3 h-3" />
            <span>{trip.capacity}</span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5 bg-[#FAFAF7]">
        <div className="space-y-2.5">
          {/* Title */}
          <h3 className="font-bold text-xl text-[#17231C] group-hover:text-[#1B4332] transition-colors leading-snug">
            {trip.title}
          </h3>

          {/* 1-Line Route Summary */}
          <p className="text-sm text-[#4A554E] line-clamp-2 leading-relaxed">
            {trip.summary}
          </p>

          {/* Highlights Tag */}
          <div className="pt-1 flex flex-wrap gap-1.5">
            {trip.highlights.map((h, i) => (
              <span
                key={i}
                className="text-[11px] font-medium text-[#1B4332] bg-white border border-[#1B4332]/10 px-2.5 py-0.5 rounded-md shadow-2xs"
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Validity Row + Refined Button Palette */}
        <div className="pt-4 border-t border-[#EAE6DF] space-y-3">
          {/* Price & Validity */}
          <div>
            <span className="text-[11px] text-[#859088] font-medium block">
              {t.packages.fromPrice}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-[#1B4332] tabular-nums">
                {formatRupiah(trip.price)}
              </span>
              <span className="text-xs text-[#859088]">{t.packages.perPax}</span>
            </div>
            <p className="text-[11px] text-[#C86D51] font-medium mt-1 truncate">
              ✦ {trip.validity}
            </p>
          </div>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {/* View Detail Button */}
            <button
              type="button"
              onClick={() => onSelectTrip(trip)}
              className="border border-[#1B4332] text-[#1B4332] bg-white hover:bg-[#1B4332]/5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>{t.packages.viewDetail}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Book Now Button */}
            <a
              href={generateWhatsAppBookingUrl(trip.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-semibold rounded-xl px-5 py-2.5 shadow-md shadow-[#1B4332]/20 transition-all inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>{t.packages.bookNow}</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

import React, { useState, useEffect } from 'react';
import { X, Check, X as CrossIcon, Calendar, MessageCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatRupiah, generateWhatsAppBookingUrl } from '../utils/formatters';

export default function TripDetailModal({ trip, onClose, t, lang }) {
  const [pax, setPax] = useState(2);

  useEffect(() => {
    if (trip) {
      setPax(2);
    }
  }, [trip?.id]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!trip) return null;

  const totalCost = (trip.price || 0) * pax;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#EAE6DF] overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Modal with Close X */}
        <div className="relative border-b border-[#EAE6DF] bg-white px-6 py-4 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#F2F7F4] text-[#1B4332] border border-[#1B4332]/15">
                {trip.location}
              </span>
              <span className="text-xs text-[#859088] font-medium">• {trip.duration}</span>
              <span className="text-xs text-[#859088] font-medium">• {trip.capacity}</span>
            </div>
            <h3 className="font-bold text-lg sm:text-xl text-[#17231C]">
              {trip.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAF8F5] hover:bg-[#EAE6DF] text-[#4A554E] hover:text-[#17231C] flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ml-4"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Visual Banner */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/8] sm:aspect-[21/9]">
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-xs text-[#D4A373] font-semibold tracking-wider uppercase mb-1">
                {trip.region}
              </span>
              <p className="text-sm text-[#EAE6DF] line-clamp-2">
                {trip.summary}
              </p>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-[#EAE6DF] text-xs">
            <div>
              <span className="text-[#859088] font-medium block">{t.modal.meetingPoint}</span>
              <span className="text-[#17231C] font-semibold">{trip.meetingPoint}</span>
            </div>
            <div>
              <span className="text-[#859088] font-medium block">{t.modal.departureSchedule}</span>
              <span className="text-[#1B4332] font-semibold">{trip.validity}</span>
            </div>
          </div>

          {/* Timeline Kegiatan Harian */}
          <div>
            <h4 className="text-xs font-bold text-[#17231C] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>{t.modal.itineraryTitle}</span>
            </h4>

            <div className="space-y-4">
              {trip.itinerary && trip.itinerary.map((item) => (
                <div
                  key={item.day}
                  className="bg-white rounded-xl p-4 sm:p-5 border border-[#EAE6DF]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-lg bg-[#1B4332] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      H{item.day}
                    </span>
                    <h5 className="font-bold text-sm text-[#17231C]">
                      {lang === 'id' ? `Hari ${item.day}` : `Day ${item.day}`}: {item.title}
                    </h5>
                  </div>
                  <ul className="space-y-2 pl-9">
                    {item.activities.map((act, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-[#4A554E] list-disc leading-relaxed">
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 2 Kolom Fasilitas: Include & Exclude */}
          <div>
            <h4 className="text-xs font-bold text-[#17231C] uppercase tracking-wider mb-4">
              {t.modal.facilitiesTitle}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kolom Include */}
              <div className="bg-white border border-[#1B4332]/25 rounded-xl p-4 sm:p-5">
                <h5 className="font-bold text-xs text-[#1B4332] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#1B4332]" />
                  <span>{t.modal.included}</span>
                </h5>
                <ul className="space-y-2">
                  {trip.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#17231C]">
                      <Check className="w-3.5 h-3.5 text-[#1B4332] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kolom Exclude */}
              <div className="bg-white border border-[#EAE6DF] rounded-xl p-4 sm:p-5">
                <h5 className="font-bold text-xs text-[#859088] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CrossIcon className="w-4 h-4 text-[#859088]" />
                  <span>{t.modal.excluded}</span>
                </h5>
                <ul className="space-y-2">
                  {trip.excludes.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#859088]">
                      <CrossIcon className="w-3.5 h-3.5 text-[#859088] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Modal: Pax Stepper + Total Biaya Dinamis + Tombol WA */}
        <div className="border-t border-[#EAE6DF] bg-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Total Price Display */}
            <div>
              <span className="text-[11px] text-[#859088] font-medium block">
                {lang === 'id' ? `Total (${pax} Peserta):` : `Total (${pax} Pax):`}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-[#1B4332] tabular-nums">
                  {formatRupiah(totalCost)}
                </span>
                <span className="text-xs text-[#859088] tabular-nums">
                  ({formatRupiah(trip.price)}/pax)
                </span>
              </div>
            </div>

            {/* Interactive Pax Stepper */}
            <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#EAE6DF] p-1.5 rounded-xl self-start sm:self-auto shadow-2xs">
              <span className="text-xs font-semibold text-[#4A554E] px-1">
                {lang === 'id' ? 'Peserta:' : 'Pax:'}
              </span>
              <button
                type="button"
                onClick={() => setPax((prev) => Math.max(1, prev - 1))}
                disabled={pax <= 1}
                className="w-7 h-7 rounded-lg bg-white border border-[#EAE6DF] hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-bold text-sm text-[#17231C] active:scale-95 transition-all cursor-pointer"
                title={lang === 'id' ? 'Kurangi peserta' : 'Decrease pax'}
              >
                -
              </button>
              <span className="w-6 text-center font-bold text-sm text-[#1B4332] tabular-nums select-none">
                {pax}
              </span>
              <button
                type="button"
                onClick={() => setPax((prev) => Math.min(20, prev + 1))}
                className="w-7 h-7 rounded-lg bg-white border border-[#EAE6DF] hover:bg-slate-100 flex items-center justify-center font-bold text-sm text-[#17231C] active:scale-95 transition-all cursor-pointer"
                title={lang === 'id' ? 'Tambah peserta' : 'Increase pax'}
              >
                +
              </button>
            </div>
          </div>

          {/* Dynamic WhatsApp Link */}
          <a
            href={generateWhatsAppBookingUrl(trip.title, pax, totalCost, lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>
              {lang === 'id' ? `Booking ${pax} Orang via WA` : `Book for ${pax} Pax via WA`}
            </span>
          </a>
        </div>

      </motion.div>
    </div>
  );
}

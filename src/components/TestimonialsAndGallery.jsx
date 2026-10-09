import React from 'react';
import { Star, Quote, Camera, Heart, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { TESTIMONIALS, COMMUNITY_GALLERY } from '../data/testimonials';

export default function TestimonialsAndGallery({ t, lang }) {
  // Alternating tilt degrees for Polaroid/Adventure Journal style
  const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1'];

  return (
    <section id="galeri" className="py-20 md:py-24 bg-[#FAF8F5] border-t border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Testimoni Header with Category Badge */}
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-[#1B4332]/10 text-[#1B4332] border border-[#1B4332]/20 text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
            <MessageSquare className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>{t.gallery.reviewTag}</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17231C] tracking-tight font-sans">
            {t.gallery.reviewTitle}
          </h2>

          <p className="text-[#4A554E] text-base leading-relaxed">
            {t.gallery.reviewSubtitle}
          </p>
        </div>

        {/* 3 Review Cards with Warm Card Shadow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {TESTIMONIALS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-[#EAE6DF] shadow-[0_10px_30px_-5px_rgba(27,67,50,0.06)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D4A373]/50" />
                </div>

                <p className="text-sm text-[#4A554E] leading-relaxed italic mb-6">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE6DF] flex items-center gap-3.5">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs flex-shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#17231C]">{review.name}</h4>
                  <p className="text-xs text-[#859088]">{review.city} • {review.date}</p>
                  <span className="inline-block text-[11px] font-medium text-[#1B4332] mt-0.5">
                    {review.trip}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dokumentasi Komunitas Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 bg-[#1B4332]/10 text-[#1B4332] border border-[#1B4332]/20 text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
              <Camera className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>{t.gallery.galleryTag}</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17231C] pt-2">
              {t.gallery.galleryTitle}
            </h3>
          </div>
          <span className="text-xs text-[#859088] font-medium">
            {t.gallery.gallerySubtitle}
          </span>
        </div>

        {/* Strip Foto Komunitas: Polaroid / Adventure Journal Frame Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {COMMUNITY_GALLERY.map((photo, idx) => {
            const tiltClass = tilts[idx % tilts.length];
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`p-2 pb-3.5 bg-white shadow-md hover:shadow-xl border border-[#EAE6DF] rounded-xl transition-all duration-300 transform ${tiltClass} hover:rotate-0 hover:scale-105 cursor-pointer`}
              >
                <div className="relative rounded-lg overflow-hidden aspect-[4/5] bg-[#EAE6DF]">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 text-white">
                    <span className="text-[10px] text-[#D4A373] font-semibold">{photo.location}</span>
                    <span className="text-xs font-bold leading-tight">{photo.title}</span>
                  </div>
                </div>
                {/* Journal Caption under photo */}
                <div className="pt-2 px-1 text-center">
                  <span className="text-[11px] font-semibold text-[#4A554E] truncate block">
                    {photo.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

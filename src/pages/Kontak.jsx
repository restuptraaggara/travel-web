import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, MessageCircle, Mail, Phone, ChevronDown, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/formatters';

export default function Kontak({ t, lang }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: 'Flores & Labuan Bajo',
    dates: '',
    guests: '2 - 4 Orang',
    notes: '',
  });

  const [expandedFaq, setExpandedFaq] = useState(0);

  const offices = [
    {
      title: 'Kantor Pusat Operasional (Head Office)',
      locationName: 'Bukittinggi, Sumatera Barat',
      address: 'Jl. Pariwisata No. 12, Guguk Panjang, Bukittinggi, Sumatera Barat 26115',
      hours: 'Senin - Minggu: 08.00 - 21.00 WIB',
      phone: '+62 811-6602-898',
      email: 'info@nusantaravista.com',
      badge: 'Headquarters & Sumatera Basecamp',
    },
    {
      title: 'Dermaga & Marine Basecamp (Flores Hub)',
      locationName: 'Marina Labuan Bajo, Flores, NTT',
      address: 'Kawasan Marina Bay Waterfront, Labuan Bajo, Manggarai Barat, NTT 86763',
      hours: 'Senin - Minggu: 07.00 - 20.00 WITA',
      phone: '+62 811-6602-898',
      email: 'flores@nusantaravista.com',
      badge: 'Liveaboard & Phinisi Operations',
    },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const text = `*FORMULIR KONSULTASI NUSANTARAVISTA*
• Nama: ${formData.name || '-'}
• No. WA: ${formData.phone || '-'}
• Destinasi Tujuan: ${formData.destination}
• Estimasi Tanggal: ${formData.dates || 'Fleksibel'}
• Jumlah Peserta: ${formData.guests}
• Catatan Khusus: ${formData.notes || 'Mohon rekomendasi paket terbaik'}`;

    const url = generateGeneralWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
            <span className="text-[#D4A373]">{t.nav.contact}</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest text-[#D4A373] uppercase mb-4">
            <MessageCircle className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>{t.contact.tag}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-white max-w-3xl mb-4">
            {t.contact.title}
          </h1>

          <p className="text-sm sm:text-base text-[#EAE6DF] max-w-2xl leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* 2. BASECAMP OFFICES CARDS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-[#EAE6DF] shadow-[0_4px_25px_-5px_rgba(27,67,50,0.06)] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#1B4332] bg-[#1B4332]/10 border border-[#1B4332]/20 px-3 py-1 rounded-full inline-block">
                  {office.badge}
                </span>

                <h3 className="text-xl font-extrabold text-[#17231C]">
                  {office.title}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-[#4A554E] pt-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#1B4332] flex-shrink-0 mt-0.5" />
                    <span>{office.hours}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-[#17231C]">{office.phone}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                    <span>{office.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE6DF]">
                <a
                  href={`https://wa.me/628116602898?text=${encodeURIComponent(
                    `Halo Admin NusantaraVista (${office.locationName}), saya ingin bertanya seputar layanan tour.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#FAF8F5] hover:bg-[#1B4332] text-[#1B4332] hover:text-white border border-[#1B4332]/20 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Chat CS {office.locationName}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE CONTACT FORM & DIRECT WHATSAPP SUBMIT */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#EAE6DF] shadow-[0_10px_35px_-5px_rgba(27,67,50,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info (Col 1-5) */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold text-[#C86D51] tracking-wider uppercase">
              RESPON CEPAT & RAMAH
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C] leading-snug">
              {t.contact.formTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A554E] leading-relaxed">
              {t.contact.formSubtitle}
            </p>

            <div className="pt-4 space-y-3 text-xs text-[#4A554E]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                <span>Konsultasi gratis tanpa komitmen apa pun</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                <span>Pilihan rute fleksibel sesuai preferensi Anda</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                <span>Rekomendasi hotel/homestay lokal berakreditasi</span>
              </div>
            </div>

            <div className="p-4 bg-[#F5F2EB] rounded-2xl border border-[#EAE6DF] space-y-1">
              <span className="text-[11px] font-bold text-[#1B4332] block">
                ✦ Butuh Respon Instan Saat Ini?
              </span>
              <p className="text-xs text-[#4A554E]">
                Anda juga dapat langsung menekan tombol WhatsApp hijau di pojok kanan bawah layar untuk tersambung ke CS jaga kami.
              </p>
            </div>
          </div>

          {/* Right Form (Col 6-12) */}
          <form onSubmit={handleFormSubmit} className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#17231C] mb-1.5">
                  {t.contact.labels.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Misal: Bapak Hendra Kusuma"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-xs sm:text-sm text-[#17231C] focus:bg-white focus:outline-none focus:border-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231C] mb-1.5">
                  {t.contact.labels.whatsapp} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Misal: 0812-3456-7890"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-xs sm:text-sm text-[#17231C] focus:bg-white focus:outline-none focus:border-[#1B4332]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#17231C] mb-1.5">
                  {t.contact.labels.destination}
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-xs sm:text-sm text-[#17231C] focus:bg-white focus:outline-none focus:border-[#1B4332]"
                >
                  <option value="Flores & Labuan Bajo">Flores & Labuan Bajo (Sailing Phinisi)</option>
                  <option value="Sumatera Barat & Danau Toba">Sumatera Barat & Danau Toba</option>
                  <option value="Jawa Timur & Bromo">Jawa Timur & Gunung Bromo</option>
                  <option value="Kepulauan Derawan">Kalimantan Timur & Derawan</option>
                  <option value="Kawah Ijen & Baluran">Kawah Ijen & TN Baluran</option>
                  <option value="Rute Privat Kustom">Rute Privat Kustom / Wilayah Lain</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17231C] mb-1.5">
                  {t.contact.labels.travelDates}
                </label>
                <input
                  type="text"
                  value={formData.dates}
                  onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                  placeholder="Misal: Pertengahan November 2025"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-xs sm:text-sm text-[#17231C] focus:bg-white focus:outline-none focus:border-[#1B4332]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17231C] mb-1.5">
                {t.contact.labels.guestsCount}
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-xs sm:text-sm text-[#17231C] focus:bg-white focus:outline-none focus:border-[#1B4332]"
              >
                <option value="2 Orang (Pasangan / Honeymoon)">2 Orang (Pasangan / Honeymoon)</option>
                <option value="3 - 5 Orang (Keluarga Kecil)">3 - 5 Orang (Keluarga Kecil)</option>
                <option value="6 - 10 Orang (Keluarga Besar / Sahabat)">6 - 10 Orang (Keluarga Besar / Sahabat)</option>
                <option value="11 - 25 Orang (Rombongan Komunitas)">11 - 25 Orang (Rombongan Komunitas)</option>
                <option value="> 25 Orang (Corporate / Gathering Kantor)">&gt; 25 Orang (Corporate / Gathering Kantor)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#17231C] mb-1.5">
                {t.contact.labels.notes}
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Tuliskan jika ada kebutuhan khusus, seperti diet makanan, lansia, anak-anak, atau sewa mobil..."
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-xs sm:text-sm text-[#17231C] focus:bg-white focus:outline-none focus:border-[#1B4332]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Send className="w-4 h-4" />
              <span>{t.contact.labels.submit}</span>
            </button>
          </form>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section className="max-w-4xl mx-auto px-6 sm:px-12 py-12">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold text-[#1B4332] tracking-wider uppercase">
            BANTUAN INFORMASI
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
            {t.contact.faqTitle}
          </h3>
        </div>

        <div className="space-y-3">
          {t.contact.faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#EAE6DF] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? -1 : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#17231C] cursor-pointer hover:text-[#1B4332] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#859088] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#1B4332]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#4A554E] leading-relaxed border-t border-[#EAE6DF]/60 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

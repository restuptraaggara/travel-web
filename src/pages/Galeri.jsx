import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Star, MapPin, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/formatters';

export default function Galeri({ t, lang }) {
  const [activeTab, setActiveTab] = useState('all');

  const galleryItems = [
    {
      id: 1,
      title: 'Puncak Padar Saat Fajar Keemasan',
      journalNote: 'Pagi di Pulau Padar, NTT',
      location: 'Taman Nasional Komodo, NTT',
      category: 'bahari',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      caption: 'Pemandangan tiga teluk legendaris dengan siluet kepulauan Flores di ufuk timur.',
    },
    {
      id: 2,
      title: 'Dinding Granit Lembah Harau',
      journalNote: 'Dinding Megah Harau, Sumbar',
      location: 'Lima Puluh Kota, Sumatera Barat',
      category: 'budaya',
      image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1000&q=80',
      caption: 'Hamparan sawah menghijau diapit tebing granit raksasa setinggi 150 meter.',
    },
    {
      id: 3,
      title: 'Offroad Jeep Menembus Lautan Pasir Bromo',
      journalNote: 'Subuh Menembus Kabut Bromo, Jatim',
      location: 'Tengger, Jawa Timur',
      category: 'gunung',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1000&q=80',
      caption: 'Deru armada 4x4 melintasi pasir berbisik di bawah taburan bintang dini hari.',
    },
    {
      id: 4,
      title: 'Perkampungan Rumah Bolon Kuno Samosir',
      journalNote: 'Rumah Bolon Kuno Tomok, Samosir',
      location: 'Danau Toba, Sumatera Utara',
      category: 'budaya',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
      caption: 'Kearifan arsitektur Batak Toba dan pertunjukan patung magis Sigale-gale.',
    },
    {
      id: 5,
      title: 'Snorkeling Bersama Penyu Derawan',
      journalNote: 'Berenang Bareng Penyu Derawan, Kaltim',
      location: 'Kepulauan Derawan, Kaltim',
      category: 'bahari',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      caption: 'Kejernihan air toska dan keramahan satwa laut yang hidup berdampingan dengan warga.',
    },
    {
      id: 6,
      title: 'Pesona Api Biru Kawah Ijen',
      journalNote: 'Kobaran Api Biru Ijen, Banyuwangi',
      location: 'Banyuwangi, Jawa Timur',
      category: 'gunung',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
      caption: 'Fenomena langka belerang menyala di kedalaman kawah asam terbesar di dunia.',
    },
    {
      id: 7,
      title: 'Gradasi Pink Beach Flores',
      journalNote: 'Pantai Pasir Pink, Labuan Bajo',
      location: 'Labuan Bajo, NTT',
      category: 'bahari',
      image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1000&q=80',
      caption: 'Pasir merah muda alami bentukan serpihan foraminifera mikroskopis.',
    },
    {
      id: 8,
      title: 'Savana Hijau Bukit Holbung',
      journalNote: 'Savana Hijau Bukit Holbung, Toba',
      location: 'Samosir, Danau Toba',
      category: 'budaya',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      caption: 'Menikmati heningnya permukaan air danau dari ketinggian padang rumput Teletubbies.',
    },
    {
      id: 9,
      title: 'Kanopi Rimba Hujan Tropis Sumatera',
      journalNote: 'Rimba Leuser Berembun, Sumut',
      location: 'Taman Nasional Gunung Leuser',
      category: 'gunung',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
      caption: 'Menyusuri jalur trekking kanopi bersama ranger penjaga hutan lindung.',
    },
  ];

  const fullTestimonials = [
    {
      id: 1,
      name: 'Rizky Andana & Keluarga',
      city: 'Jakarta Selatan',
      trip: '4H3M Pesona Danau Toba & Samosir Heritage',
      date: 'Agustus 2024',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote:
        'Pengalaman keliling Danau Toba yang luar biasa! Pemandu lokal NusantaraVista sangat paham adat Batak dan sejarah Pulau Samosir. Mobil Hiace-nya bersih, wangi, dan driver-nya bawa mobil sangat halus di tanjakan Tele.',
    },
    {
      id: 2,
      name: 'Dr. Amanda Larasati',
      city: 'Surabaya',
      trip: '3H2M Liveaboard Sailing Komodo',
      date: 'Juli 2024',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote:
        'Sailing bareng NusantaraVista beneran berasa private trip karena kuota per kapal dijaga ketat. Makanan di kapal dimasakin hangat oleh chef lokal, dan momen snorkeling bareng pari manta di Manta Point dibantu banget sama kru!',
    },
    {
      id: 3,
      name: 'Fajar Nugraha',
      city: 'Bandung',
      trip: '3H2M Eksotisme Lembah Harau & Bukittinggi',
      date: 'September 2024',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote:
        'Makan rendang asli yang diaduk di tungku kayu bakar warga Lembah Harau itu tiada tandingannya. Tidak ada pungutan liar atau biaya tersembunyi seperti travel lain. Sangat transparan, profesional, dan beretika.',
    },
    {
      id: 4,
      name: 'Stephan & Clara',
      city: 'Singapura',
      trip: '2H1M Bromo Midnight Sunrise & Savana',
      date: 'Juni 2024',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote:
        'The Bromo sunrise was pure magic! NusantaraVista took us to a secret viewing point away from the crowd. Our guide had hot ginger tea ready while waiting for the dawn. Highly recommend their private service!',
    },
    {
      id: 5,
      name: 'Budi Santoso & Rekan Kantor',
      city: 'Tangerang',
      trip: '4H3M Derawan & Maratua Lagoon',
      date: 'Mei 2024',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote:
        'Gathering divisi kami seru sekali di Derawan. Ke Danau Kakaban berenang bareng ubur-ubur tanpa sengat bikin semua takjub. Speedboat-nya aman, pelampungnya berkualitas, dan fotonya jernih-jernih!',
    },
    {
      id: 6,
      name: 'Nadia Putri',
      city: 'Yogyakarta',
      trip: '2H1M Kawah Ijen Blue Fire Experience',
      date: 'Oktober 2024',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote:
        'Pendakian tengah malam ke Ijen didampingi guide yang sabar dan sigap. Masker gas yang disediakan sangat proper sehingga kami bisa menyaksikan api biru dengan aman dan nyaman.',
    },
  ];

  const filteredGallery =
    activeTab === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

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
            <span className="text-[#D4A373]">{t.nav.gallery}</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest text-[#D4A373] uppercase mb-4">
            <Camera className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>{t.gallery.galleryTag}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-white max-w-3xl mb-4">
            {t.gallery.galleryTitle}
          </h1>

          <p className="text-sm sm:text-base text-[#EAE6DF] max-w-2xl leading-relaxed">
            {t.gallery.gallerySubtitle}
          </p>
        </div>
      </section>

      {/* 2. PHOTO GALLERY (POLAROID ADVENTURE JOURNAL STYLE) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: lang === 'id' ? 'Semua Momen' : 'All Moments' },
            { id: 'bahari', label: lang === 'id' ? 'Bahari & Sailing' : 'Marine & Sailing' },
            { id: 'gunung', label: lang === 'id' ? 'Gunung & Highland' : 'Mountains & Highlands' },
            { id: 'budaya', label: lang === 'id' ? 'Budaya & Desa Adat' : 'Culture & Heritage' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-white text-[#4A554E] border border-[#EAE6DF] hover:bg-[#F5F2EB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid: Adventure Journal / Polaroid Frame Styling */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-9"
        >
          <AnimatePresence>
            {filteredGallery.map((item, index) => {
              const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
              const rotationClass = rotations[index % rotations.length];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`bg-white p-4 pb-6 rounded-2xl border border-[#EAE6DF] shadow-[0_8px_30px_rgb(0,0,0,0.06)] ${rotationClass} hover:rotate-0 hover:scale-105 hover:shadow-2xl transition-all duration-300 z-0 hover:z-10 flex flex-col justify-between group cursor-pointer`}
                >
                  {/* Photo frame */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <MapPin className="w-3 h-3 text-[#D4A373]" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Adventure Journal / Polaroid Caption Area */}
                  <div className="p-2 pt-4 space-y-1.5 border-t border-dashed border-[#EAE6DF]/90 mt-3 text-left">
                    {/* Handwritten / serif italic caption note */}
                    <p className="font-serif italic text-base sm:text-lg text-[#17231C] tracking-wide leading-snug">
                      "{item.journalNote || item.title}"
                    </p>

                    {/* Sans tipis lokasi & takarir */}
                    <div className="flex items-center gap-1.5 text-xs text-[#859088] font-sans font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
                      <span>{item.title}</span>
                    </div>

                    <p className="text-xs text-[#4A554E] font-sans leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Instagram Follow Community Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#17231C] to-[#20503c] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#D4A373] stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-sm sm:text-base">
                {t.gallery.instagramFollow}
              </h5>
              <p className="text-xs text-[#EAE6DF]">
                Tagar resmi: #NusantaraVista #EksplorasiOtentik
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white text-[#17231C] text-xs font-bold rounded-xl shadow-xs hover:bg-[#FAF8F5] transition-all"
          >
            Lihat Instagram Kami
          </a>
        </div>
      </section>

      {/* 3. VERIFIED TRAVELER TESTIMONIAL REVIEWS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#C86D51] tracking-wider uppercase">
            {t.gallery.reviewTag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C]">
            {t.gallery.reviewTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#4A554E]">
            {t.gallery.reviewSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-7 rounded-3xl border border-[#EAE6DF] shadow-xs flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#859088] font-medium">{item.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#4A554E] italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#EAE6DF]">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#EAE6DF]"
                />
                <div>
                  <h5 className="text-xs font-bold text-[#17231C]">{item.name}</h5>
                  <span className="text-[11px] text-[#859088] block">{item.city}</span>
                  <span className="text-[10px] text-[#1B4332] font-semibold block">{item.trip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

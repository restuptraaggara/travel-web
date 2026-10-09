import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import TripDetailModal from './components/TripDetailModal';

// Dedicated Route Pages
import Home from './pages/Home';
import Destinasi from './pages/Destinasi';
import PaketWisata from './pages/PaketWisata';
import RentalArmada from './pages/RentalArmada';
import KenapaKami from './pages/KenapaKami';
import Galeri from './pages/Galeri';
import Kontak from './pages/Kontak';

import { translations } from './data/i18n';

export default function App() {
  const [lang, setLang] = useState('id');
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Active translation dictionary
  const t = translations[lang] || translations.id;

  return (
    <BrowserRouter>
      {/* Scroll restoration helper: smoothly scrolls to top on route change */}
      <ScrollToTop />

      <div className="min-h-screen bg-[#FAF8F5] text-[#4A554E] flex flex-col selection:bg-[#1B4332] selection:text-[#FAF8F5] font-sans antialiased">
        {/* SHARED HEADER / NAVBAR (STICKY ACROSS ALL ROUTES WITH ROUTE INDICATORS & ID/EN TOGGLE) */}
        <Navbar lang={lang} onSetLang={setLang} t={t} />

        {/* MAIN ROUTE VIEW CONTAINER */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  t={t}
                  lang={lang}
                  onSelectTrip={(trip) => setSelectedTrip(trip)}
                />
              }
            />
            <Route
              path="/destinasi"
              element={<Destinasi t={t} lang={lang} />}
            />
            <Route
              path="/paket-wisata"
              element={
                <PaketWisata
                  t={t}
                  lang={lang}
                  onSelectTrip={(trip) => setSelectedTrip(trip)}
                />
              }
            />
            <Route
              path="/rental-armada"
              element={<RentalArmada t={t} lang={lang} />}
            />
            <Route
              path="/kenapa-kami"
              element={<KenapaKami t={t} lang={lang} />}
            />
            <Route
              path="/galeri"
              element={<Galeri t={t} lang={lang} />}
            />
            <Route
              path="/kontak"
              element={<Kontak t={t} lang={lang} />}
            />
            {/* Catch-all fallback */}
            <Route
              path="*"
              element={
                <Home
                  t={t}
                  lang={lang}
                  onSelectTrip={(trip) => setSelectedTrip(trip)}
                />
              }
            />
          </Routes>
        </main>

        {/* SHARED FOOTER ACROSS ALL ROUTES */}
        <Footer t={t} lang={lang} />

        {/* SHARED FLOATING WHATSAPP BUTTON ACROSS ALL ROUTES */}
        <FloatingWhatsApp t={t} lang={lang} />

        {/* SHARED MODAL DETAIL ITINERARY WITH ANIMATE PRESENCE */}
        <AnimatePresence>
          {selectedTrip && (
            <TripDetailModal
              trip={selectedTrip}
              onClose={() => setSelectedTrip(null)}
              t={t}
              lang={lang}
            />
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

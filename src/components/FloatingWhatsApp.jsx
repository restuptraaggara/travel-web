import React from 'react';
import { MessageCircle } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '../utils/formatters';

export default function FloatingWhatsApp({ t, lang }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <a
        href={generateGeneralWhatsAppUrl(
          lang === 'id'
            ? 'Halo Admin NusantaraVista, saya ingin tanya ketersediaan kuota trip.'
            : 'Hello NusantaraVista, I would like to inquire about tour availability.'
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Support"
        className="pointer-events-auto group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />

        <div className="flex flex-col text-left">
          <span className="text-[10px] text-white/90 leading-tight">
            {t.footer.onlineBadge}
          </span>
          <span className="text-xs font-bold leading-tight">
            {t.footer.onlineAction}
          </span>
        </div>
      </a>
    </div>
  );
}

export function formatRupiah(amount) {
  if (typeof amount !== 'number') return 'Rp 0';
  return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const OFFICIAL_PHONE = '628116602898';

export function generateWhatsAppBookingUrl(tripTitle, pax = 1, totalPrice = null, lang = 'id') {
  let message;
  if (totalPrice && pax) {
    message = lang === 'id'
      ? `Halo Admin NusantaraVista, saya ingin booking paket "${tripTitle}" untuk ${pax} orang dengan estimasi biaya ${formatRupiah(totalPrice)}. Mohon info ketersediaan slot terdekat.`
      : `Hello Admin NusantaraVista, I would like to book the "${tripTitle}" package for ${pax} people with an estimated cost of ${formatRupiah(totalPrice)}. Please confirm slot availability.`;
  } else {
    message = `Halo Admin NusantaraVista, saya ingin reservasi/tanya jadwal dan kuota paket "${tripTitle}". Mohon info ketersediaan slot terdekat.`;
  }
  return `https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppRentalUrl(vehicleName) {
  const message = `Halo Admin NusantaraVista, saya ingin sewa armada "${vehicleName}". Bisa minta info ketersediaan armada, rute, dan jadwal?`;
  return `https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(message)}`;
}

export function generateGeneralWhatsAppUrl(customNote = '') {
  const message = customNote || 'Halo Admin NusantaraVista, saya ingin konsultasi rencana perjalanan wisata domestik bersama pemandu lokal.';
  return `https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(message)}`;
}

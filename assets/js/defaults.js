/**
 * Site 1 – Elegant Luxury (Ivory / Champagne / Gold)
 * Default configuration. Overridden by localStorage when admin saves.
 */
window.SITE_DEFAULTS = {
  siteKey: 'beauty_site1_elegant',
  business: {
    name: 'Lumina Atelier',
    tagline: 'Zarafet ve özenle tasarlanmış güzellik deneyimi',
    logoText: 'LUMINA',
    logoImage: null, // base64 or null
    phone: '0532 000 11 22',
    whatsapp: '905320001122',
    email: 'merhaba@luminaatelier.com',
    address: 'Caddebostan, Bağdat Cad. No:142, Kadıköy / İstanbul',
    hours: 'Pazartesi – Cumartesi 10:00 – 20:00 | Pazar Kapalı',
    social: {
      instagram: 'https://instagram.com/',
      facebook: '',
      tiktok: ''
    }
  },
  colors: {
    primary: '#C9A87C',
    primaryDark: '#A88B5E',
    secondary: '#F8F1E9',
    accent: '#E8D5C4',
    text: '#2C2C2C',
    textLight: '#6B6B6B',
    bg: '#FDFBF8',
    white: '#FFFFFF',
    dark: '#1A1A1A'
  },
  hero: {
    title: 'Kendinizi Ödüllendirin',
    subtitle: 'Profesyonel cilt bakımı, kalıcı makyaj ve saç tasarımı ile yeni bir versiyonunuza merhaba deyin.',
    ctaText: 'Randevu Al',
    ctaLink: '#iletisim',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80',
    overlay: 0.35
  },
  about: {
    title: 'Neden Lumina?',
    text: '2018’den beri İstanbul’da kadınlara özel bir alan sunuyoruz. Her detayda hijyen, uzmanlık ve samimiyet önceliğimiz. Sadece bir güzellik salonu değil, kendinize zaman ayırdığınız bir mola noktasıyız.',
    features: [
      'Uzman kadro & sürekli eğitim',
      'Sterilizasyon garantili ekipman',
      'Kişiye özel danışmanlık',
      'Rahat ve ferah ortam'
    ],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80'
  },
  services: [
    { id: 's1', icon: '✨', title: 'Cilt Bakımı', desc: 'Kişiye özel cilt analizi ve profesyonel bakım protokolleri ile ışıltılı bir cilt.', price: '850 ₺’den', duration: '60 dk', visible: true },
    { id: 's2', icon: '💄', title: 'Kalıcı Makyaj', desc: 'Kaş, eyeliner ve dudak uygulamalarıyla her sabah hazır bir görünüm.', price: '2.500 ₺’den', duration: '2 saat', visible: true },
    { id: 's3', icon: '💇‍♀️', title: 'Saç Tasarımı', desc: 'Kesim, boya, ombre ve bakım uygulamalarıyla size özel saç stilleri.', price: '650 ₺’den', duration: '90 dk', visible: true },
    { id: 's4', icon: '💅', title: 'Manikür & Pedikür', desc: 'Hijyenik ve uzun ömürlü tırnak bakımı, protez tırnak seçenekleri.', price: '450 ₺’den', duration: '45 dk', visible: true }
  ],
  gallery: [
    { id: 'g1', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', alt: 'Cilt bakımı' },
    { id: 'g2', url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', alt: 'Makyaj' },
    { id: 'g3', url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80', alt: 'Saç tasarımı' },
    { id: 'g4', url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80', alt: 'Salon ambiyansı' },
    { id: 'g5', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', alt: 'Tırnak bakımı' },
    { id: 'g6', url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80', alt: 'Spa detayı' }
  ],
  testimonials: [
    { id: 't1', text: 'Cilt bakımı sonrası cildim hiç bu kadar ışıltılı olmamıştı. Gerçekten fark yaratıyorlar.', name: 'Selin A.', rating: 5 },
    { id: 't2', text: 'Kaşlarım için microblading yaptırdım, sonuç doğal ve harika.', name: 'Deniz T.', rating: 5 },
    { id: 't3', text: 'Hem hijyen hem sonuç açısından en iyi deneyimlerden biri.', name: 'Merve K.', rating: 5 }
  ],
  seo: {
    title: 'Lumina Atelier | Premium Güzellik Salonu',
    description: 'İstanbul Kadıköy’de zarif cilt bakımı, kalıcı makyaj ve saç tasarımı.'
  },
  admin: {
    user: 'admin',
    pass: 'admin123'
  }
};

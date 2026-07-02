export interface Pembalap {
  slug: string;
  nama: string;
  tim: string;
  negara: string;
  nomorMobil: string;
  deskripsi: string;
  poin: number;
  podium: number;
  statistik: string;
  tema: {
    aksen: string;
    border: string;
    nomorGlow: string;
    badge: string;
  };
}

export const databasePembalap: Pembalap[] = [
  { 
    slug: "max-verstappen", nama: "Max Verstappen", tim: "Oracle Red Bull Racing", nomorMobil: "1", negara: "Belanda", 
    deskripsi: "Juara dunia bertahan dengan gaya balap yang sangat agresif tanpa kompromi.", 
    poin: 75, podium: 3, statistik: "Menang di GP Bahrain, Arab Saudi, dan Jepang.",
    tema: { aksen: "text-blue-400", border: "hover:border-blue-500/40", nomorGlow: "group-hover:text-blue-500/10", badge: "bg-blue-950/40 border-blue-900/50 text-blue-400" }
  },
  { 
    slug: "charles-leclerc", nama: "Charles Leclerc", tim: "Scuderia Ferrari HP", nomorMobil: "16", negara: "Monako", 
    deskripsi: "Pembalap andalan Ferrari yang luar biasa cepat saat sesi kualifikasi dan dicintai publik Maranello.", 
    poin: 70, podium: 2, statistik: "Konsisten naik podium dan merebut pole position di Melbourne.",
    tema: { aksen: "text-red-500", border: "hover:border-red-500/40", nomorGlow: "group-hover:text-red-500/10", badge: "bg-red-950/40 border-red-900/50 text-red-400" }
  },
  { 
    slug: "lando-norris", nama: "Lando Norris", tim: "McLaren Mastercard", nomorMobil: "4", negara: "Inggris", 
    deskripsi: "Talenta muda berbakat yang memimpin era kebangkitan besar performa mobil balap McLaren.", 
    poin: 63, podium: 2, statistik: "Menempel ketat Verstappen di barisan depan sepanjang musim.",
    tema: { aksen: "text-orange-500", border: "hover:border-orange-500/40", nomorGlow: "group-hover:text-orange-500/10", badge: "bg-orange-950/40 border-orange-900/50 text-orange-400" }
  },
  { 
    slug: "lewis-hamilton", nama: "Lewis Hamilton", tim: "Ferrari", nomorMobil: "44", negara: "Inggris", 
    deskripsi: "Juara dunia 7 kali yang siap mengukir sejarah baru bersama tim Kuda Jingkrak mulai musim depan.", 
    poin: 34, podium: 0, statistik: "Sedang mengoptimalkan set-up mobil untuk sisa balapan musim ini.",
    tema: { aksen: "text-red-600", border: "hover:border-red-600/40", nomorGlow: "group-hover:text-red-600/10", badge: "bg-red-950/40 border-red-900/60 text-red-500" }
  },
  { 
    slug: "oscar-piastri", nama: "Oscar Piastri", tim: "McLaren Mastercard", nomorMobil: "81", negara: "Australia", 
    deskripsi: "Pembalap muda Australia dengan ketenangan luar biasa di bawah tekanan, aset masa depan McLaren.", 
    poin: 41, podium: 1, statistik: "Mengamankan poin penting dan naik podium kokoh di sirkuit jalan raya Saudi.",
    tema: { aksen: "text-orange-400", border: "hover:border-orange-400/40", nomorGlow: "group-hover:text-orange-400/10", badge: "bg-orange-950/40 border-orange-900/50 text-orange-400" }
  },
  { 
    slug: "george-russell", nama: "George Russell", tim: "Mercedes-AMG PETRONAS", nomorMobil: "63", negara: "Inggris", 
    deskripsi: "Pembalap andalan Inggris yang memiliki kecepatan kualifikasi satu lap tunggal yang sangat mematikan.", 
    poin: 37, podium: 0, statistik: "Konsisten membawa mobil W15 finis di zona 5 besar dalam awal musim ini.",
    tema: { aksen: "text-emerald-400", border: "hover:border-emerald-500/40", nomorGlow: "group-hover:text-emerald-500/10", badge: "bg-emerald-950/40 border-emerald-900/50 text-emerald-400" }
  },
  { 
    slug: "fernando-alonso", nama: "Fernando Alonso", tim: "Aston Martin Aramco", nomorMobil: "14", negara: "Spanyol", 
    deskripsi: "Legenda hidup F1 terkaya pengalaman di grid yang terkenal dengan insting balapan yang luar biasa cerdik.", 
    poin: 31, podium: 0, statistik: "Melakukan manuver bertahan legendaris untuk mengamankan poin krusial di Suzuka.",
    tema: { aksen: "text-green-500", border: "hover:border-green-500/40", nomorGlow: "group-hover:text-green-500/10", badge: "bg-green-950/40 border-green-900/50 text-green-400" }
  },
  { 
    slug: "carlos-sainz", nama: "Carlos Sainz", tim: "Williams Racing", nomorMobil: "55", negara: "Spanyol", 
    deskripsi: "Pembalap taktis dengan kemampuan analisis mekanis tinggi yang kini memimpin ambisi kebangkitan tim Williams.", 
    poin: 22, podium: 0, statistik: "Tampil impresif memaksimalkan paket aero mobil baru pada balapan pembuka.",
    tema: { aksen: "text-blue-500", border: "hover:border-blue-500/40", nomorGlow: "group-hover:text-blue-500/10", badge: "bg-blue-950/40 border-blue-900/50 text-blue-400" }
  }
];
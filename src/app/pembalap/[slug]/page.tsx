"use client";

import React, { use } from 'react';
import Link from 'next/link';

// Database lokal sebagai fallback data detail
const detailDatabase = {
  "max-verstappen": {
    nama: "Max Verstappen",
    tim: "Oracle Red Bull Racing",
    nomor: "1",
    negara: "Belanda",
    poin: 258,
    deskripsi: "Juara dunia bertahan yang mendominasi grid dengan kecepatan dan presisi luar biasa.",
    tema: { bg: "from-blue-900 to-black", teks: "text-blue-400", nomorGlow: "text-blue-500/10" }
  },
  "charles-leclerc": {
    nama: "Charles Leclerc",
    tim: "Scuderia Ferrari HP",
    nomor: "16",
    negara: "Monako",
    poin: 197,
    deskripsi: "Pembalap andalan Ferrari dengan kemampuan kualifikasi yang luar biasa tajam.",
    tema: { bg: "from-red-900 to-black", teks: "text-red-400", nomorGlow: "text-red-500/10" }
  },
  "lando-norris": {
    nama: "Lando Norris",
    tim: "McLaren Mastercard",
    nomor: "4",
    negara: "Inggris",
    poin: 215,
    deskripsi: "Talenta muda berbakat yang membawa McLaren kembali bersaing di papan atas kejuaraan.",
    tema: { bg: "from-orange-600/40 via-gray-900 to-black", teks: "text-orange-400", nomorGlow: "text-orange-500/10" }
  },
  "lewis-hamilton": {
    nama: "Lewis Hamilton",
    tim: "Ferrari",
    nomor: "44",
    negara: "Inggris",
    poin: 150,
    deskripsi: "Juara dunia 7 kali yang siap mengukir sejarah baru bersama tim berlambang kuda jingkrak.",
    tema: { bg: "from-red-950 via-gray-900 to-black", teks: "text-red-500", nomorGlow: "text-red-600/10" }
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DetailPembalapPage({ params }: PageProps) {
  // Buka data params asinkronus Next.js 16 menggunakan React.use()
  const unpackedParams = use(params);
  const slug = unpackedParams.slug;

  const pembalap = detailDatabase[slug as keyof typeof detailDatabase];

  if (!pembalap) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 space-y-4">
        <h2 className="text-xl font-bold text-red-500">⚠️ Profil Pembalap Tidak Ditemukan!</h2>
        <p className="text-xs text-gray-400">Slug URL &quot;{slug}&quot; tidak terdaftar di database paddock.</p>
        <Link href="/pembalap" className="text-sm bg-gray-900 border border-gray-800 text-gray-300 px-4 py-2 rounded-xl hover:bg-gray-800 transition-all">
          &larr; Kembali ke Paddock
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <Link href="/pembalap" className="inline-block text-xs font-semibold text-gray-400 hover:text-white bg-gray-950 border border-gray-900 px-3 py-1.5 rounded-xl transition-colors">
        &larr; Kembali ke Line-up
      </Link>

      <div className={`relative bg-gradient-to-br ${pembalap.tema.bg} border border-gray-900 rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl`}>
        {/* Nomor besar di latar belakang - Tegak lurus */}
        <span className={`absolute -right-4 -bottom-10 text-[12rem] font-black pointer-events-none tracking-tighter select-none transition-colors duration-500 ${pembalap.tema.nomorGlow}`}>
          #{pembalap.nomor}
        </span>

        <div className="relative space-y-4 max-w-md">
          <div>
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-950/50 px-2 py-0.5 rounded border border-red-900/30">
              Driver Profile
            </span>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-2 text-white">
              {pembalap.nama}
            </h1>
            <p className="text-sm font-medium text-gray-300 mt-1">{pembalap.tim}</p>
          </div>

          <div className="pt-2 border-t border-gray-800/60 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Asal Negara</span>
              <span className="text-sm font-bold text-gray-200">{pembalap.negara}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Total Poin</span>
              <span className={`text-sm font-mono font-bold ${pembalap.tema.teks}`}>{pembalap.poin} PTS</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Biografi &amp; Karir</span>
            <p className="text-xs text-gray-400 leading-relaxed font-light">{pembalap.deskripsi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
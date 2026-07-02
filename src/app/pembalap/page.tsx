"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Pembalap {
  slug: string;
  nama: string;
  tim: string;
  negara: string;
  nomorMobil: string;
  poin: number;
  tema: {
    aksen: string;
    border: string;
    badge: string;
  };
}

export default function PaddockPage() {
  const [daftarPembalap, setDaftarPembalap] = useState<Pembalap[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Fitur Pencarian & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTim, setSelectedTim] = useState("Semua");

  // Ambil data dari API internal terpusat
  useEffect(() => {
    async function fetchPembalap() {
      try {
        const res = await fetch('/api/pembalap');
        const data = await res.json();
        setDaftarPembalap(data);
      } catch (err) {
        console.error("Gagal mengambil data paddock:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPembalap();
  }, []);

  // Logika Penyaringan (Filtering) Data
  const pembalapTersaring = daftarPembalap.filter((pembalap) => {
    const cocokNama = pembalap.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const cocokTim = selectedTim === "Semua" || pembalap.tim === selectedTim;
    return cocokNama && cocokTim;
  });

  // Mengambil daftar tim unik untuk dropdown filter
  const semuaTim = ["Semua", ...Array.from(new Set(daftarPembalap.map((p) => p.tim)))];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4 space-y-3">
        <div className="w-10 h-10 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400">Membuka Gerbang Paddock F1...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="space-y-2 border-b border-gray-900 pb-6">
        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300">
          F1 Paddock Insights
        </h1>
        <p className="text-xs text-gray-400 font-light tracking-wide">
          Sistem Telemetri & Profil Driver Grid Formula 1 Musim Aktif.
        </p>
      </div>

      {/* Kontrol Panel: Search Bar & Filter Tim */}
      <div className="flex flex-col sm:flex-row gap-3 bg-gray-950 p-4 rounded-2xl border border-gray-900 shadow-inner">
        {/* Input Cari Nama */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Cari nama pembalap..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 text-sm px-4 py-2.5 rounded-xl border border-gray-800 focus:outline-none focus:border-red-500/50 text-white placeholder-gray-500 transition-all"
          />
        </div>

        {/* Dropdown Filter Tim */}
        <div className="sm:w-64">
          <select
            value={selectedTim}
            onChange={(e) => setSelectedTim(e.target.value)}
            className="w-full bg-gray-900 text-sm px-4 py-2.5 rounded-xl border border-gray-800 focus:outline-none focus:border-red-500/50 text-white cursor-pointer transition-all"
          >
            {semuaTim.map((tim) => (
              <option key={tim} value={tim} className="bg-gray-900">
                {tim}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Tampilan Pembalap */}
      {pembalapTersaring.length === 0 ? (
        <div className="text-center py-12 bg-gray-950 rounded-2xl border border-dashed border-gray-900">
          <p className="text-sm text-gray-500">❌ Tidak ada pembalap atau tim yang cocok dengan pencarian.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pembalapTersaring.map((pembalap) => (
            <Link 
              key={pembalap.slug} 
              href={`/pembalap/${pembalap.slug}`}
              className={`bg-gray-950/40 border border-gray-900 ${pembalap.tema.border} rounded-2xl p-5 block relative overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl group backdrop-blur-sm`}
            >
              {/* Nomor Mobil di Sudut Atas */}
              <span className="absolute top-3 right-4 font-mono font-black text-2xl text-gray-800/20 group-hover:text-gray-700/30 transition-colors select-none">
                #{pembalap.nomorMobil}
              </span>

              {/* Tag Negara */}
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                {pembalap.negara}
              </span>

              {/* Nama Pembalap */}
              <h2 className="text-lg font-bold text-white mt-1 group-hover:text-red-400 transition-colors tracking-tight">
                {pembalap.nama}
              </h2>

              {/* Nama Tim dengan Aksen Warna Unik */}
              <p className={`text-xs font-semibold mt-0.5 ${pembalap.tema.aksen}`}>
                {pembalap.tim}
              </p>

              {/* Badge Skor Poin Kecil */}
              <div className="mt-4 pt-3 border-t border-gray-900/60 flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Live Skor</span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${pembalap.tema.badge}`}>
                  {pembalap.poin} PTS
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
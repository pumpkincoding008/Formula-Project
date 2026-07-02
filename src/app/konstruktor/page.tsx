"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Konstruktor {
  tim: string;
  totalPoin: number;
  totalPodium: number;
  aksen: string;
}

export default function StandingsPage() {
  const [klasemen, setKlasemen] = useState<Konstruktor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKlasemen() {
      try {
        const res = await fetch('/api/konstruktor');
        const data = await res.json();
        setKlasemen(data);
      } catch (err) {
        console.error("Gagal memuat klasemen:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchKlasemen();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
        <div className="w-10 h-10 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400 mt-3">Menghitung Kalkulasi Poin Konstruktor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Tombol Navigasi Antar Halaman */}
      <div className="flex justify-between items-center border-b border-gray-900 pb-4">
        <Link href="/pembalap" className="text-xs bg-gray-950 hover:bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl text-gray-400 hover:text-white transition-all">
          &larr; Lihat Line-up Pembalap
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-950/30 px-3 py-1 rounded-full border border-red-900/40">
          Live Standings
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-black uppercase tracking-tight italic">Klasemen Kejuaraan Konstruktor</h1>
        <p className="text-xs text-gray-500">Poin di bawah ini dihitung otomatis berdasarkan akumulasi performa pembalap di grid.</p>
      </div>

      {/* Papan Peringkat (Leaderboard) */}
      <div className="bg-gray-950 border border-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-12 bg-gray-900/50 p-4 text-[10px] uppercase font-bold tracking-wider text-gray-400 border-b border-gray-900">
          <div className="col-span-2 text-center">Posisi</div>
          <div className="col-span-6">Nama Tim / Konstruktor</div>
          <div className="col-span-2 text-center">Podium</div>
          <div className="col-span-2 text-right pr-2">Total Poin</div>
        </div>

        <div className="divide-y divide-gray-900/60">
          {klasemen.map((item, index) => (
            <div 
              key={item.tim} 
              className="grid grid-cols-12 p-4 items-center text-sm font-medium hover:bg-gray-900/20 transition-colors group"
            >
              {/* Nomor Posisi Juara */}
              <div className="col-span-2 text-center font-mono font-bold text-gray-400 group-hover:text-white transition-colors">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}`}
              </div>

              {/* Nama Tim */}
              <div className="col-span-6 font-bold text-gray-200">
                <span className={`block group-hover:underline cursor-default transition-all ${item.aksen}`}>
                  {item.tim}
                </span>
              </div>

              {/* Jumlah Podium */}
              <div className="col-span-2 text-center font-mono text-gray-400">
                {item.totalPodium}
              </div>

              {/* Total Poin Akhir */}
              <div className="col-span-2 text-right pr-2 font-mono font-bold text-white text-base">
                {item.totalPoin} <span className="text-[10px] text-gray-500 font-normal">pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
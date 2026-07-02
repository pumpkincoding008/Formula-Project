"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Pembalap {
  nama: string;
  tim: string;
  poin: number;
}

interface Konstruktor {
  tim: string;
  totalPoin: number;
  aksen: string;
}

interface JadwalBalapan {
  seri: string;
  sirkuit: string;
  negara: string;
  tanggal: string;
  sesiUtamaWIB: string;
  panjangLintasan: string;
  totalLap: string;
}

export default function DashboardHome() {
  const [topDriver, setTopDriver] = useState<Pembalap | null>(null);
  const [topTeam, setTopTeam] = useState<Konstruktor | null>(null);
  const [nextRace, setNextRace] = useState<JadwalBalapan | null>(null);
  const [totalPembalap, setTotalPembalap] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Ambil data Pembalap, Konstruktor, dan Jadwal Balapan sekaligus
        const [resDrivers, resTeams, resRace] = await Promise.all([
          fetch('/api/pembalap'),
          fetch('/api/konstruktor'),
          fetch('/api/next-race')
        ]);

        const drivers: Pembalap[] = await resDrivers.json();
        const teams: Konstruktor[] = await resTeams.json();
        const raceData: JadwalBalapan = await resRace.json();

        if (drivers.length > 0) {
          setTotalPembalap(drivers.length);
          const leaderDriver = [...drivers].sort((a, b) => b.poin - a.poin)[0];
          setTopDriver(leaderDriver);
        }

        if (teams.length > 0) {
          setTopTeam(teams[0]);
        }

        setNextRace(raceData);
      } catch (err) {
        console.error("Gagal memuat ringkasan dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="w-10 h-10 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400 mt-3 font-light">Menyelaraskan Data Satelit Paddock...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      
      {/* Banner Utama */}
      <div className="relative bg-gradient-to-r from-red-900/40 via-gray-900 to-black border border-gray-800 rounded-3xl p-6 md:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl font-black tracking-tighter pointer-events-none select-none">
          F1
        </div>
        <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-950/50 px-2.5 py-1 rounded-md border border-red-900/40">
          Telemetry Active
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase mt-4 text-white">
          PADDOCK <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">INSIGHTS</span>
        </h1>
        <p className="text-xs md:text-sm text-gray-400 max-w-xl mt-2 font-light leading-relaxed">
          Selamat datang di pusat kendali data Formula 1. Pantau statistik performa individu pembalap dan kalkulasi poin konstruktor secara akurat langsung dari garasi tim.
        </p>
      </div>

      {/* WIDGET BARU: Next Race Telemetry Card (Tegak & Bersih) */}
      {nextRace && (
        <div className="bg-gray-950 border border-gray-900 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block">
              Up Next &bull; Round Schedule
            </span>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              {nextRace.seri}
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              {nextRace.sirkuit}, <span className="text-gray-300">{nextRace.negara}</span>
            </p>
          </div>

          {/* Manfaatkan Grid Kecil untuk Detail Telemetri Trek */}
          <div className="flex flex-wrap gap-4 md:gap-8 w-full md:w-auto border-t md:border-t-0 border-gray-900 pt-4 md:pt-0">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-wider text-gray-500 block">Race Date</span>
              <span className="text-sm font-bold text-gray-200 font-mono">{nextRace.tanggal}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold tracking-wider text-gray-500 block">Green Light (WIB)</span>
              <span className="text-sm font-bold text-red-400 font-mono">{nextRace.sesiUtamaWIB}</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[9px] uppercase font-bold tracking-wider text-gray-500 block">Circuit Distance</span>
              <span className="text-sm font-bold text-gray-400 font-mono">{nextRace.panjangLintasan}</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[9px] uppercase font-bold tracking-wider text-gray-500 block">Total Distance</span>
              <span className="text-sm font-bold text-gray-400 font-mono">{nextRace.totalLap}</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid Ringkasan Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-950 border border-gray-900 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-gray-800 transition-all">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">Driver Standings Leader</span>
          <h3 className="text-xl font-extrabold text-white mt-2 group-hover:text-red-400 transition-colors">
            {topDriver ? topDriver.nama : "Tidak ada data"}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">{topDriver ? topDriver.tim : "-"}</p>
          <div className="mt-4 text-2xl font-mono font-black text-red-500">
            {topDriver ? topDriver.poin : 0} <span className="text-xs font-normal text-gray-400">PTS</span>
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-900 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-gray-800 transition-all">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">Constructor Leader</span>
          <h3 className={`text-xl font-extrabold mt-2 transition-colors ${topTeam ? topTeam.aksen : "text-white"}`}>
            {topTeam ? topTeam.tim : "Tidak ada data"}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Penguasa Grid Terkini</p>
          <div className="mt-4 text-2xl font-mono font-black text-gray-100">
            {topTeam ? topTeam.totalPoin : 0} <span className="text-xs font-normal text-gray-400">PTS</span>
          </div>
        </div>

        <div className="bg-gray-950 border border-gray-900 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-gray-800 transition-all">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">Active Drivers Cached</span>
          <h3 className="text-xl font-extrabold text-white mt-2">
            {totalPembalap} Pembalap Terdaftar
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Database Lokal Terintegrasi</p>
          <div className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 
            Sistem 100% Sinkron
          </div>
        </div>
      </div>

      {/* Menu Navigasi Cepat */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Akses Cepat Fasilitas Paddock</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/pembalap" className="p-5 bg-gray-950 hover:bg-gray-900/60 border border-gray-900 hover:border-red-500/30 rounded-2xl flex flex-col justify-between transition-all group">
            <div>
              <span className="text-lg">🏎️</span>
              <h4 className="text-base font-bold text-white mt-2 group-hover:text-red-400 transition-colors">Line-up Pembalap</h4>
              <p className="text-xs text-gray-500 mt-1 font-light">Buka profil, telemetri balap, statistik podium, dan cari nama driver aktif.</p>
            </div>
            <span className="text-xs font-bold text-red-500 mt-4 group-hover:translate-x-1 transition-transform inline-block">Buka Garasi &rarr;</span>
          </Link>

          <Link href="/konstruktor" className="p-5 bg-gray-950 hover:bg-gray-900/60 border border-gray-900 hover:border-orange-500/30 rounded-2xl flex flex-col justify-between transition-all group">
            <div>
              <span className="text-lg">🏆</span>
              <h4 className="text-base font-bold text-white mt-2 group-hover:text-orange-400 transition-colors">Klasemen Konstruktor</h4>
              <p className="text-xs text-gray-500 mt-1 font-light">Pantau total akumulasi poin persaingan antar tim papan atas secara langsung.</p>
            </div>
            <span className="text-xs font-bold text-orange-400 mt-4 group-hover:translate-x-1 transition-transform inline-block">Lihat Papan Peringkat &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
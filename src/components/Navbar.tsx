"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // Daftar menu navigasi agar rapi dan mudah dikelola
  const menuNavigasi = [
    { nama: 'Dashboard', rute: '/' },
    { nama: 'Profil Pembalap', rute: '/pembalap' },
    { nama: 'Klasemen Tim', rute: '/konstruktor' },
  ];

  return (
    <header className="w-full bg-black/80 border-b border-gray-900 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo Utama - Tegak & Bold */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="bg-red-600 text-white font-black px-2 py-0.5 rounded text-sm tracking-tighter">
            F1
          </span>
          <span className="font-black uppercase tracking-tight text-sm text-white group-hover:text-red-500 transition-colors">
            Paddock Insights
          </span>
        </Link>

        {/* Menu Navigasi Kanan */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {menuNavigasi.map((menu) => {
            // Cek apakah halaman ini yang sedang dibuka oleh user
            const apakahAktif = pathname === menu.rute || (menu.rute !== '/' && pathname.startsWith(menu.rute));

            return (
              <Link
                key={menu.rute}
                href={menu.rute}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-300 ${
                  apakahAktif
                    ? 'bg-gray-900 text-red-400 border border-gray-800/60 shadow-inner'
                    : 'text-gray-400 hover:text-white hover:bg-gray-950'
                }`}
              >
                {menu.nama}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
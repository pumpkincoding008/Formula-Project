import { NextResponse } from 'next/server';

// Data balapan langsung di dalam API agar aman dari salah path
const dataBalapanSelanjutnya = {
  seri: "British Grand Prix",
  sirkuit: "Silverstone Circuit",
  negara: "Inggris",
  tanggal: "5 Juli 2026",
  sesiUtamaWIB: "21:00 WIB",
  panjangLintasan: "5.891 km",
  totalLap: "52 Lap"
};

// Pastikan ditulis "GET" dengan huruf kapital semua
export async function GET() {
  return NextResponse.json(dataBalapanSelanjutnya);
}
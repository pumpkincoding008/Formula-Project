import { NextResponse } from 'next/server';

const listPembalap = [
  { nama: "Max Verstappen", tim: "Oracle Red Bull Racing", poin: 258 },
  { nama: "Lando Norris", tim: "McLaren Mastercard", poin: 215 },
  { nama: "Charles Leclerc", tim: "Scuderia Ferrari HP", poin: 197 },
  { nama: "Lewis Hamilton", tim: "Ferrari", poin: 150 }
];

export async function GET() {
  return NextResponse.json(listPembalap);
}
import { NextResponse } from 'next/server';

const listKonstruktor = [
  { tim: "Scuderia Ferrari HP", totalPoin: 347, aksen: "text-red-400" },
  { tim: "Oracle Red Bull Racing", totalPoin: 258, aksen: "text-blue-400" },
  { tim: "McLaren Mastercard", totalPoin: 215, aksen: "text-orange-400" }
];

export async function GET() {
  return NextResponse.json(listKonstruktor);
}
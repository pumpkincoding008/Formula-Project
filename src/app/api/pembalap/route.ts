import { NextResponse } from 'next/server';

const listPembalap = [
  {
    slug: "max-verstappen",
    nama: "Max Verstappen",
    tim: "Oracle Red Bull Racing",
    negara: "BELANDA",
    nomorMobil: "1",
    poin: 258,
    tema: {
      aksen: "text-blue-400",
      border: "hover:border-blue-500/50",
      badge: "bg-blue-950/40 border-blue-800 text-blue-400"
    }
  },
  {
    slug: "lando-norris",
    nama: "Lando Norris",
    tim: "McLaren Mastercard",
    negara: "INGGRIS",
    nomorMobil: "4",
    poin: 215,
    tema: {
      aksen: "text-orange-400",
      border: "hover:border-orange-500/50",
      badge: "bg-orange-950/40 border-orange-800 text-orange-400"
    }
  },
  {
    slug: "charles-leclerc",
    nama: "Charles Leclerc",
    tim: "Scuderia Ferrari HP",
    negara: "MONAKO",
    nomorMobil: "16",
    poin: 197,
    tema: {
      aksen: "text-red-400",
      border: "hover:border-red-500/50",
      badge: "bg-red-950/40 border-red-800 text-red-400"
    }
  },
  {
    slug: "lewis-hamilton",
    nama: "Lewis Hamilton",
    tim: "Scuderia Ferrari HP",
    negara: "INGGRIS",
    nomorMobil: "44",
    poin: 150,
    tema: {
      aksen: "text-red-500",
      border: "hover:border-red-600/50",
      badge: "bg-red-950/60 border-red-900 text-red-500"
    }
  }
];

export async function GET() {
  return NextResponse.json(listPembalap);
}
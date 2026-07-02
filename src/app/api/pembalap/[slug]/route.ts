import { NextResponse } from 'next/server';
import { databasePembalap } from '@/data/pembalapData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Mencari item pembalap di dalam array pusat yang slug-nya cocok
  const pembalap = databasePembalap.find((p) => p.slug === slug);

  if (!pembalap) {
    return NextResponse.json({ error: "Pembalap tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(pembalap);
}
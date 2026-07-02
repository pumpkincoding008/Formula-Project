export interface JadwalBalapan {
  seri: string;
  sirkuit: string;
  negara: string;
  tanggal: string;
  sesiUtamaWIB: string;
  panjangLintasan: string;
  totalLap: string;
}

export const dataBalapanSelanjutnya: JadwalBalapan = {
  seri: "British Grand Prix",
  sirkuit: "Silverstone Circuit",
  negara: "Inggris",
  tanggal: "5 Juli 2026",
  sesiUtamaWIB: "21:00 WIB",
  panjangLintasan: "5.891 km",
  totalLap: "52 Lap"
};
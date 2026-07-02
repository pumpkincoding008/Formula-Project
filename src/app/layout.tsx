import type { Metadata } from "next";
import { Lexend } from "next/font/google"; // 1. Impor font Lexend dari Google Fonts
import "./globals.css";
import Navbar from "@/components/Navbar";

// 2. Konfigurasi font Lexend yang akan digunakan
const fontLexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"], // Menyediakan variasi dari tipis sampai sangat tebal
  display: "swap",
});

export const metadata: Metadata = {
  title: "F1 Paddock Insights",
  description: "Dashboard Analisis dan Data Formula 1 Terkini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* 3. Masukkan fontLexend.className ke dalam tag body */}
      <body className={`${fontLexend.className} bg-[#0b0f19] text-gray-100 antialiased min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maya Exports Ltd — Fashion | Enterprise Apparel & Textile Manufacturing",
  description:
    "Leading vertical garment and textile export manufacturer. Supplying premium woven, knitwear, and technical apparel to tier-one global brands across the UK, Europe, North America, Middle East, and Australia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0B1220] text-slate-100 font-sans selection:bg-[#D4A54A]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}


import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ASTROTERRAX — O Despertar",
    template: "%s | ASTROTERRAX",
  },
  description:
    "Uma jornada além das estrelas. Explore um planeta desconhecido, descubra seus mistérios e sobreviva.",
  applicationName: "ASTROTERRAX",
  keywords: [
    "Astroterrax",
    "exploração espacial",
    "aventura",
    "jogo 3D",
    "ficção científica",
  ],
  authors: [{ name: "ASTROTERRAX" }],
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080914",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

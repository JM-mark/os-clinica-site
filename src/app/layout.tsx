import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { clinic, SITE_URL } from "@/config";
import { Providers } from "@/components/Providers";

// Display: Instrument Serif (estreita, alto contraste); palavras de acento no itálico da mesma família.
// (Libre Caslon Condensed, usada no Dentelle, não está no next/font.)
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans-body", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono-label", display: "swap" });

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const description =
  "Odontologia integrada em Valinhos/SP: do cuidado preventivo ao sorriso que você quer ter. Agende sua avaliação online em menos de 1 minuto.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "OS Clínica — Odontologia Integrada em Valinhos/SP", template: "%s | OS Clínica" },
  description,
  openGraph: {
    title: "OS Clínica — Odontologia Integrada em Valinhos/SP",
    description,
    type: "website",
    locale: "pt_BR",
    siteName: "OS Clínica",
    images: [{ url: `${base}/og.png`, width: 1200, height: 630, alt: "OS Clínica — Odontologia Integrada em Valinhos/SP" }],
  },
  icons: { icon: `${base}/icon.png`, apple: `${base}/apple-touch-icon.png` },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#F7F5F1", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "OS Clínica — Odontologia Integrada",
  url: SITE_URL,
  telephone: "+55-19-3869-2611",
  email: clinic.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address.street,
    addressLocality: "Valinhos",
    addressRegion: "SP",
    postalCode: clinic.address.zip,
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
  sameAs: [clinic.instagram, clinic.facebook],
  areaServed: "Valinhos, SP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Ir para o conteúdo
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

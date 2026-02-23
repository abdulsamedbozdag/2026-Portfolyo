import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display, Plus_Jakarta_Sans, REM } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const rem = REM({
  subsets: ["latin"],
  variable: "--font-rem",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export const metadata: Metadata = {
  title: "Abdulsamed Bozdağ — İletişim Tasarımcısı",
  description: "Kullanıcı deneyimi ve marka odaklı projeler üreten bir İletişim Tasarımcısı. Dijital ürünler, görsel kimlik ve 3D tasarım.",
  keywords: ["iletişim tasarımı", "UI/UX", "marka", "3D tasarım", "portfolyo", "Abdulsamed Bozdağ"],
  authors: [{ name: "Abdulsamed Bozdağ" }],
  creator: "Abdulsamed Bozdağ",
  openGraph: {
    title: "Abdulsamed Bozdağ — İletişim Tasarımcısı",
    description: "Kullanıcı deneyimi ve marka odaklı projeler üreten bir İletişim Tasarımcısı.",
    type: "website",
    locale: "tr_TR",
    siteName: "Abdulsamed Bozdağ Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulsamed Bozdağ — İletişim Tasarımcısı",
    description: "Kullanıcı deneyimi ve marka odaklı projeler üreten bir İletişim Tasarımcısı.",
  },
  robots: { index: true, follow: true },
};

import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${outfit.variable} ${playfair.variable} ${jakarta.variable} ${rem.variable} font-sans antialiased`}>
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScroll>
              <CustomCursor />
              {/* Ambient Noise Texture */}
              {/* ... */}
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

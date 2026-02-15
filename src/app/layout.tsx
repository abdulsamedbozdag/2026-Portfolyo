import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${outfit.variable} ${playfair.variable} ${jakarta.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <CustomCursor />
            {/* Ambient Noise Texture */}
            <div className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.03] text-black dark:text-white mix-blend-overlay">
              <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
                <filter id='noise'>
                  <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch' />
                </filter>
                <rect width='100%' height='100%' filter='url(#noise)' />
              </svg>
            </div>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

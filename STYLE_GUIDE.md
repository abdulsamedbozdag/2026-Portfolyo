# 🎨 Portfolyo — Stil Rehberi & Teknoloji Dokümanı

> Abdulsamed Bozdağ | Communication Designer Portfolio

---

## 1. Teknoloji Yığını (Tech Stack)

### Çekirdek Framework
| Teknoloji | Versiyon | Rol |
|---|---|---|
| **Next.js** | 16.1.6 | React meta-framework (App Router, Turbopack) |
| **React** | 19.2.3 | UI kütüphanesi |
| **TypeScript** | ^5 | Tip güvenliği |

### Stil & CSS
| Teknoloji | Versiyon | Rol |
|---|---|---|
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **@tailwindcss/postcss** | v4 | PostCSS entegrasyonu |
| **clsx** | ^2.1.1 | Koşullu className birleştirme |
| **tailwind-merge** | ^3.4.0 | Tailwind class çakışmalarını çözme |

### Animasyon & Motion
| Teknoloji | Versiyon | Rol |
|---|---|---|
| **Framer Motion** | ^12.34.0 | Sayfa geçişleri, bileşen animasyonları, scroll animasyonları |
| **GSAP** | ^3.14.2 | ScrollTrigger ile video scrubbing (TEDx sayfası) |
| **@gsap/react** | ^2.1.2 | GSAP React hook'ları (`useGSAP`) |
| **Lenis** | ^1.3.17 | Smooth scroll deneyimi |

### 3D & WebGL
| Teknoloji | Versiyon | Rol |
|---|---|---|
| **Three.js** | ^0.182.0 | 3D render motoru |
| **@react-three/fiber** | ^9.5.0 | React Three.js renderer |
| **@react-three/drei** | ^10.7.7 | Yardımcı 3D bileşenler (Stage, OrbitControls, Float, useGLTF) |
| **use-sound** | ^5.0.0 | 3D model hover ses efekti |

### Fizik Motoru
| Teknoloji | Versiyon | Rol |
|---|---|---|
| **Matter.js** | ^0.20.0 | 2D fizik simülasyonu |

### UI & İkonlar
| Teknoloji | Versiyon | Rol |
|---|---|---|
| **Lucide React** | ^0.564.0 | İkon kütüphanesi (ArrowUpRight, ArrowLeft, Sun, Moon) |
| **next-themes** | ^0.4.6 | Dark/Light tema yönetimi |

---

## 2. Tipografi (Fonts)

### Ana Font
| Font | Kaynak | Kullanım |
|---|---|---|
| **Outfit** | Google Fonts (`next/font/google`) | Tüm UI metinleri, başlıklar, gövde metni |

**CSS Değişkeni:** `--font-outfit`

### Boyut Skalası (Tailwind)
| Kullanım | Class | Yaklaşık Boyut |
|---|---|---|
| Hero İsim | `text-[clamp(3rem,10vw,9rem)]` | 48px – 144px (responsive) |
| Bölüm Başlıkları | `text-4xl md:text-6xl` | 36px / 60px |
| Alt Başlıklar | `text-2xl md:text-3xl` | 24px / 30px |
| Proje Başlıkları | `text-3xl` | 30px |
| Gövde Metni | `text-lg md:text-xl` | 18px / 20px |
| Etiket / Label | `text-xs` | 12px |
| Üst Bar / Küçük Metin | `text-[11px]` | 11px |

### Tipografi Özellikleri
- **Tracking:** `-0.04em` (başlıklarda sıkı), `0.25em` (üst bar etiketlerinde geniş)
- **Leading:** `0.9` (başlıklarda sıkı), `relaxed` (gövde metinlerinde)
- **Font Weight:** `font-bold` (700), `font-semibold` (600), `font-medium` (500), `font-light` (300)

---

## 3. Renk Paleti

### Tema Renkleri
| Renk | Light Mode | Dark Mode | Kullanım |
|---|---|---|---|
| **Background** | `#FFFFFF` | `#050505` | Ana sayfa arka planı |
| **Background (Alt)** | `#FAF9F6` | `#0A0A0A` | Hero bölümü |
| **Foreground** | `#171717` | `#EDEDED` | Ana metin rengi |

### Neutral Skalası (Tailwind)
| Token | Hex | Kullanım |
|---|---|---|
| `neutral-50` | `#FAFAFA` | About arka planı (light) |
| `neutral-100` | `#F5F5F5` | Kart arka planları (light) |
| `neutral-200` | `#E5E5E5` | Border'lar, grid çizgileri (light) |
| `neutral-300` | `#D4D4D4` | Marque yazıları, scroll indicator |
| `neutral-400` | `#A3A3A3` | Label'lar, placeholder metinler |
| `neutral-500` | `#737373` | Alt metin, açıklamalar |
| `neutral-600` | `#525252` | Gövde metni (light) |
| `neutral-700` | `#404040` | Marque separator (dark) |
| `neutral-800` | `#262626` | Border'lar, grid çizgileri (dark) |
| `neutral-900` | `#171717` | Kart arka planları (dark), ana metin (light) |
| `neutral-950` | `#0A0A0A` | Case study sayfa arka planı (dark) |

### Aksan Renkleri (Accent)
| Renk | Tailwind Token | Hex | Kullanım |
|---|---|---|---|
| **Amber** | `amber-500` | `#F59E0B` | Hero nokta, 3D Atölye kategori, Spitfire badge |
| **Red** | `red-500` | `#EF4444` | 3D & Motion disiplin noktası |
| **Red** | `red-600` | `#DC2626` | TEDx tema rengi (loader, selection) |
| **Blue** | `blue-500` | `#3B82F6` | App Tasarımı kategori noktası |
| **Purple** | `purple-500` | `#A855F7` | Marka İletişim kategori noktası |
| **Emerald** | `emerald-500` | `#10B981` | UI/UX Tasarım disiplin noktası |

### Glassmorphism & Overlay
| Kullanım | Değer |
|---|---|
| Card gradient | `bg-gradient-to-t from-black/90 via-black/40 to-transparent` |
| Backdrop blur | `backdrop-blur-md`, `backdrop-blur-sm`, `backdrop-blur-lg` |
| Glass border | `border-white/10`, `border-white/20` |
| Glass background | `bg-white/10`, `bg-white/5` |
| TEDx cinematic overlay | `from-black via-transparent to-black/40` |

---

## 4. Tasarım Özellikleri & Stiller

### Genel Tasarım Dili
- **Minimalist editorial** tasarım anlayışı
- **Dark/Light tema** desteği (`next-themes`)
- **Noise texture overlay** — Tüm sayfalarda SVG `feTurbulence` ile ince tane efekti (`opacity: 0.03`)
- **Mix-blend-difference** — Cursor ve tema toggle'da kullanılır

### Köşe Yuvarlatma (Border Radius)
| Kullanım | Class | Değer |
|---|---|---|
| Kartlar | `rounded-3xl` | 24px |
| Galeri görselleri | `rounded-2xl` | 16px |
| Etiketler (tags) | `rounded` | 4px |
| Tam yuvarlak (badge, cursor) | `rounded-full` | 50% |

### Gölgeler
| Kullanım | Class |
|---|---|
| Poster görselleri | `shadow-2xl` |
| 3D sahne çerçevesi | `shadow-2xl` |

### Geçiş & Animasyon
| Özellik | Detay |
|---|---|
| **Hover scale** | Görsellerde `scale-105` (700ms ease-out) |
| **Stagger entrance** | Kartlar sırayla `0.15s` aralıklarla girer |
| **Spring physics** | Kartlarda `damping: 20` ile spring animasyon |
| **Hero text reveal** | Aşağıdan yukarı clip (`y: 100%` → `y: 0`) ile sıralı giriş |
| **Marquee** | Sonsuz yatay kayma `duration: 30s` |
| **Scroll indicator** | Yukarı-aşağı bounce (`y: [0, 6, 0]`) |
| **Custom ease** | Hero: `[0.16, 1, 0.3, 1]` |

### Custom Cursor
- Beyaz daire, `mix-blend-difference`
- Normal: `16x16px`, hover (link/button): `3x` scale
- `spring` fizik: `stiffness: 150`, `damping: 15`, `mass: 0.1`

### Smooth Scroll
- **Lenis** kütüphanesi ile tüm sayfa smooth scroll
- `SmoothScroll` wrapper bileşeni

---

## 5. Bileşen Mimarisi (Components)

```
src/
├── app/
│   ├── layout.tsx          → Root layout, font, tema, noise overlay
│   ├── globals.css         → Tailwind import, tema değişkenleri
│   ├── page.tsx            → Ana sayfa (Hero + Projeler + About + Footer)
│   └── projects/
│       ├── tedx/page.tsx   → TEDx case study (GSAP video scrubbing)
│       └── spitfire/page.tsx → Spitfire case study (3D interaktif)
├── components/
│   ├── Hero.tsx            → Editorial hero bölümü + marquee
│   ├── ProjectCard.tsx     → Yeniden kullanılabilir proje kartı
│   ├── About.tsx           → Hakkımda bölümü
│   ├── Footer.tsx          → Sayfa altı
│   ├── CustomCursor.tsx    → Özel fare imleci
│   ├── SmoothScroll.tsx    → Lenis smooth scroll wrapper
│   ├── ThemeToggle.tsx     → Dark/Light tema butonu
│   ├── BentoGrid.tsx       → Grid layout bileşeni
│   ├── FloatingIcon.tsx    → Havada süzülen ikon
│   ├── GravityHero.tsx     → Matter.js fizik animasyonlu hero
│   ├── theme-provider.tsx  → next-themes provider wrapper
│   ├── 3d/
│   │   └── SpitfireScene.tsx → React Three Fiber 3D sahne
│   └── mockups/
│       ├── BrowserMockup.tsx → Tarayıcı mockup çerçevesi
│       └── PhoneMockup.tsx   → Telefon mockup çerçevesi
└── lib/
    └── utils.ts            → cn() utility (clsx + tailwind-merge)
```

---

## 6. Dosya Yapısı — Public Assets

```
public/
├── tedx/
│   ├── tedx-poster.png         → TEDx ana poster
│   ├── tedx-intro_1.mp4        → TEDx scroll video
│   ├── TedX1.jpg – TedX4.jpg   → TEDx galeri görselleri
│   └── TedX_SosyalMedya_*.png  → Sosyal medya görselleri
├── spitfire/
│   ├── spitfire.glb             → 3D model dosyası
│   ├── Spitfire-POSTER_V3.png   → Spitfire poster
│   └── Spitfire1.jpg – Spitfire4.jpg → Galeri görselleri
├── sound/
│   └── engine-hover.mp3        → 3D model hover ses efekti
├── car2gather/                  → (Boş — asset bekleniyor)
└── *.svg                        → Next.js varsayılan ikonlar
```

---

## 7. Responsive Breakpoint'ler

Tailwind CSS v4 varsayılan breakpoint'leri kullanılıyor:

| Breakpoint | Min Width | Kullanım |
|---|---|---|
| `sm` | 640px | — |
| `md` | 768px | Grid 2 sütun, büyük tipografi |
| `lg` | 1024px | — |
| `xl` | 1280px | — |

**Max-width container:** `max-w-[1400px]` (proje bölümü), `max-w-7xl` (case study sayfaları)

---

## 8. SEO & Meta

```html
<title>Abdulsamed Bozdağ | Communication Designer</title>
<meta name="description" content="Product Designer & AI Enthusiast bridging UI/UX, 3D Design, and AI." />
<html lang="en">
```

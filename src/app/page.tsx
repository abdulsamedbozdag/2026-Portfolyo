"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import EditorialHero from "@/components/hero/EditorialHero";
import ProjectShowcase from "@/components/editorial/ProjectShowcase";
import SpitfireInterlude from "@/components/editorial/SpitfireInterlude";
import { TireScene } from "@/components/prometeon/TireScene";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type Category = "All" | "UI/UX Design" | "3D" | "Brand & Graphic";

const categories: Category[] = ["All", "UI/UX Design", "3D", "Brand & Graphic"];

export default function Home() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const projects = [
    {
      id: "prometeon",
      category: "Marka ve İletişim",
      mainCategory: ["3D", "Brand & Graphic"],
      title: "Prometeon",
      tags: ["İç İletişim", "Basılı Materyaller", "Fabrika Giydirmeleri"],
      image: "/prometeon/Logo/Prometeon_Slogan_Darkblue_NoBox_PNG-01.png",
      href: "/projects/prometeon",
      reverse: true,
      objectContain: true,
      customComponent: <TireScene />,
      number: "01"
    },
    {
      id: "tedx",
      category: t("common.visualIdentity"),
      mainCategory: ["3D", "Brand & Graphic"],
      title: "TEDx YTU",
      tags: ["3D Tasarım", "Blender", "Marka Kimliği", "Hareketli Grafik"],
      image: "/tedx/Behance-KAPAK.jpg",
      href: "/projects/tedx",
      reverse: false,
      number: "02"
    },
    {
      id: "boody-ai",
      category: "Mobil Uygulama",
      mainCategory: ["UI/UX Design"],
      title: "Boody App",
      tags: ["UI/UX", "Mobil Tasarım"],
      image: "/Boody/Boody_Anasayfa_kapak_görseli.png",
      href: "/projects/boody-ai",
      reverse: true,
      number: "03"
    },
    {
      id: "car2gather",
      category: t("common.webPlatform"),
      mainCategory: ["UI/UX Design"],
      title: "car2gather",
      tags: ["Web Tasarım", "Kullanıcı Akışı", "SaaS"],
      image: "/car2gather/AnasayfaKapakGörseli.png",
      href: "/projects/car2gather",
      reverse: false,
      number: "04"
    },
    {
      id: "uni4society",
      category: t("uni4society.category"),
      mainCategory: ["Brand & Graphic"],
      title: "Uni4Society YTÜ",
      tags: ["Sosyal Medya", "Görsel Kimlik", "Sticker Tasarımı"],
      image: "/Uni4Society/Sticker/İçerikler/Behance-KAPAK copy.jpg",
      href: "/projects/uni4society",
      reverse: true,
      number: "05"
    }
  ];

  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-neutral-500/20 pt-10 md:pt-0 overflow-hidden">

      {/* 1. HERO SECTION */}
      <EditorialHero />

      {/* 2. MINIMALIST FILTER */}
      <div className="flex justify-center py-8 md:py-32">
        <nav className="flex items-center gap-10 md:gap-16 overflow-x-auto no-scrollbar pb-4 max-w-full px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "relative transition-all duration-300 whitespace-nowrap text-base md:text-lg tracking-tight",
                activeCategory === cat
                  ? "text-white font-medium"
                  : "text-neutral-500 hover:text-neutral-300"
              )}
            >
              <span>{cat}</span>
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeFilterDotZig"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* 3. ZIG-ZAG PROJECTS FLOW */}
      <div className="flex flex-col">
        <AnimatePresence mode="popLayout">
          {projects.filter(p => activeCategory === "All" || p.mainCategory.includes(activeCategory as any)).map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectShowcase
                number={p.number}
                category={p.category}
                title={p.title}
                tags={p.tags}
                image={p.image}
                href={p.href}
                reverse={p.reverse}
                objectContain={p.objectContain}
                customComponent={p.customComponent}
              />

              {/* Optional: Add Spitfire Interlude only when appropriate, e.g. after TEDx if both visible or just as a stand-alone filtered section */}
              {p.id === "tedx" && (activeCategory === "All" || activeCategory === "3D" || activeCategory === "Brand & Graphic") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <SpitfireInterlude />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 4. ABOUT & FOOTER */}
      <About />
      <Footer />
    </main>
  );
}

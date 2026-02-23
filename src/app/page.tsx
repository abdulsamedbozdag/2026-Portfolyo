"use client";

import { motion } from "framer-motion";
import EditorialHero from "@/components/hero/EditorialHero";
import ProjectShowcase from "@/components/editorial/ProjectShowcase";
import SpitfireInterlude from "@/components/editorial/SpitfireInterlude";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";

// Placeholder images
const PLACEHOLDERS = {
  mobileApp: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1974", // High quality mobile app placeholder
  webApp: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
  abstract3d: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2301",
};

export default function Home() {
  const { t } = useLanguage();
  return (
    <main className="bg-[#050505] min-h-screen text-[#ededed] selection:bg-white/20">
      <div className="fixed top-6 right-6 z-50 mix-blend-difference text-white">
        <ThemeToggle />
      </div>

      {/* 1. HERO SECTION */}
      <EditorialHero />

      {/* 2. BOODY AI SHOWCASE */}
      <ProjectShowcase
        number="01"
        category={t("common.mobileApp")}
        title="Boody AI"
        tags={["UI/UX", "Mobil Tasarım", "Yapay Zeka"]}
        image={PLACEHOLDERS.mobileApp}
        href="/projects/boody-ai"
        reverse={false}
      />

      {/* 3. CAR2GATHER SHOWCASE */}
      <ProjectShowcase
        number="02"
        category={t("common.webPlatform")}
        title="car2gather"
        tags={["Web Tasarım", "Kullanıcı Akışı", "SaaS"]}
        image={PLACEHOLDERS.webApp}
        href="/projects/car2gather"
        reverse={true}
      />

      {/* 4. TEDX SHOWCASE */}
      <ProjectShowcase
        number="03"
        category={t("common.visualIdentity")}
        title="TEDx YTU"
        tags={["3D Tasarım", "Blender", "Marka Kimliği", "Hareketli Grafik"]}
        image="/tedx/tedx-poster.png"
        video="/tedx/tedx-intro_1.mp4"
        href="/projects/tedx"
        reverse={false}
      />

      <ProjectShowcase
        number="04"
        category={t("common.brandComm")}
        title="Prometeon"
        tags={["Staj", "Grafik Tasarım", "İçerik Stratejisi"]}
        image="/prometeon/dagvelastik.jpeg"
        href="/projects/prometeon"
        reverse={true}
        objectContain={true}
      />

      {/* 6. SPITFIRE INTERLUDE */}
      <SpitfireInterlude />

      {/* 7. ABOUT & FOOTER */}
      <About />
      <Footer />
    </main>
  );
}

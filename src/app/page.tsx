"use client";

import { motion } from "framer-motion";
import EditorialHero from "@/components/hero/EditorialHero";
import ProjectShowcase from "@/components/editorial/ProjectShowcase";
import SpitfireInterlude from "@/components/editorial/SpitfireInterlude";
import PrometeonInterlude from "@/components/editorial/PrometeonInterlude";
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
    <main className="bg-background min-h-screen text-foreground selection:bg-neutral-500/20">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* 1. HERO SECTION */}
      <EditorialHero />

      {/* 1. PROMETEON INTERLUDE (01) */}
      <PrometeonInterlude />

      {/* 2. TEDX SHOWCASE (02) */}
      <ProjectShowcase
        number="02"
        category={t("common.visualIdentity")}
        title="TEDx YTU"
        tags={["3D Tasarım", "Blender", "Marka Kimliği", "Hareketli Grafik"]}
        image="/tedx/Behance-KAPAK.jpg"
        href="/projects/tedx"
        reverse={false}
      />

      {/* 3. SOCIAL MEDIA SHOWCASE (03) */}
      <ProjectShowcase
        number="03"
        category={t("common.brandComm")}
        title="Social Media"
        tags={["Art Direction", "Kampanya Tasarımı", "İçerik Stratejisi"]}
        image="/Social Media/kfc Billboardcopy.jpg"
        href="/projects/social-media"
        reverse={true}
      />

      {/* 4. SPITFIRE INTERLUDE (04) */}
      <SpitfireInterlude />

      {/* 5. CAR2GATHER SHOWCASE (05) */}
      <ProjectShowcase
        number="05"
        category={t("common.webPlatform")}
        title="car2gather"
        tags={["Web Tasarım", "Kullanıcı Akışı", "SaaS"]}
        image={PLACEHOLDERS.webApp}
        href="/projects/car2gather"
        reverse={false}
      />

      {/* 6. BOODY AI SHOWCASE (06) */}
      <ProjectShowcase
        number="06"
        category={t("common.mobileApp")}
        title="Boody AI"
        tags={["UI/UX", "Mobil Tasarım", "Yapay Zeka"]}
        image={PLACEHOLDERS.mobileApp}
        href="/projects/boody-ai"
        reverse={true}
      />

      {/* 7. ABOUT & FOOTER */}
      <About />
      <Footer />
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import EditorialHero from "@/components/hero/EditorialHero";
import ProjectShowcase from "@/components/editorial/ProjectShowcase";
import SpitfireInterlude from "@/components/editorial/SpitfireInterlude";
import { TireScene } from "@/components/prometeon/TireScene";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowDown, MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

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
    <main className="bg-background min-h-screen text-foreground selection:bg-neutral-500/20 pt-24 md:pt-0">

      {/* 1. HERO SECTION */}
      <EditorialHero />

      {/* 1. PROMETEON SHOWCASE (01) */}
      <ProjectShowcase
        number="01"
        category="Marka ve İletişim"
        title="Prometeon"
        titleImage="/prometeon/Logo/Prometeon_Slogan_Darkblue_NoBox_PNG-01.png"
        tags={["İç İletişim", "Basılı Materyaller", "Fabrika Giydirmeleri"]}
        image="/prometeon/Logo/Prometeon_Slogan_Darkblue_NoBox_PNG-01.png"
        customComponent={<TireScene />}
        href="/projects/prometeon"
        reverse={true}
        objectContain={true}
      />

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

      {/* SPITFIRE INTERLUDE */}
      <SpitfireInterlude />

      {/* 3. CAR2GATHER SHOWCASE (03) */}
      <ProjectShowcase
        number="03"
        category={t("common.webPlatform")}
        title="car2gather"
        tags={["Web Tasarım", "Kullanıcı Akışı", "SaaS"]}
        image={PLACEHOLDERS.webApp}
        href="/projects/car2gather"
        reverse={false}
      />

      {/* 4. BOODY AI SHOWCASE (04) */}
      <ProjectShowcase
        number="04"
        category={t("common.mobileApp")}
        title="Boody AI"
        tags={["UI/UX", "Mobil Tasarım", "Yapay Zeka"]}
        image={PLACEHOLDERS.mobileApp}
        href="/projects/boody-ai"
        reverse={true}
      />

      {/* 5. UNI4SOCIETY SHOWCASE (05) */}
      <ProjectShowcase
        number="05"
        category={t("uni4society.category")}
        title="Uni4Society YTÜ"
        tags={["Sosyal Medya", "Görsel Kimlik", "Sticker Tasarımı"]}
        image="/Uni4Society/Sticker/İçerikler/Behance-KAPAK copy.jpg"
        href="/projects/uni4society"
        reverse={false}
      />

      {/* 7. ABOUT & FOOTER */}
      <About />
      <Footer />
    </main>
  );
}

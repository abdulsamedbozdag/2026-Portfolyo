"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/* ─────────────────────────────────────────────
   STICKY BACK BUTTON
   Appears after scrolling down, stays fixed.
   Rendered via Portal to avoid DOM conflicts with GSAP ScrollTrigger.
   ───────────────────────────────────────────── */

export function StickyBackButton() {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const onScroll = () => {
            setVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-6 left-6 z-[9990]"
                >
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-medium hover:bg-black/80 transition-colors border border-white/10"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Ana Sayfa
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}

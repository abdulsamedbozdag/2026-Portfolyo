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

export function StickyBackButton({ noPortal = false }: { noPortal?: boolean }) {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setVisible(true);
    }, []);

    if (!mounted) return null;

    const content = (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={noPortal ? "z-[9990]" : "fixed top-6 left-6 z-[9990]"}
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
        </AnimatePresence>
    );

    if (noPortal) return content;

    return createPortal(content, document.body);
}

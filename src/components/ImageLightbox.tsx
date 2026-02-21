"use client";

import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ─────────────────────────────────────────────
   IMAGE LIGHTBOX
   Click any image to zoom it in a full-screen overlay.
   ───────────────────────────────────────────── */

interface LightboxImageProps {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    width?: number;
    height?: number;
    priority?: boolean;
}

export function LightboxImage({ src, alt, className, fill, width, height, priority }: LightboxImageProps) {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {/* Thumbnail */}
            <Image
                src={src}
                alt={alt}
                className={`${className ?? ""} cursor-zoom-in`}
                fill={fill}
                width={width}
                height={height}
                priority={priority}
                onClick={open}
            />

            {/* Lightbox Overlay — rendered via Portal to avoid DOM conflicts */}
            {typeof document !== "undefined" && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-2xl cursor-zoom-out"
                            onClick={close}
                        >
                            {/* Close Button */}
                            <button
                                onClick={close}
                                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Full Image */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative w-[95vw] h-[95vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    className="object-contain"
                                    sizes="95vw"
                                    quality={95}
                                />
                            </motion.div>

                            {/* Caption */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-6 text-sm text-neutral-400 pointer-events-none"
                            >
                                {alt}
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}

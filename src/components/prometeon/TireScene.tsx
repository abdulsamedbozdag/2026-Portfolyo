"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function TireScene() {
    return (
        <div className="w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-[300px] md:h-[450px]"
            >
                <Image
                    src="/prometeon/lastik_parcasi/seffaf_lastik_parcasi.png"
                    alt="Prometeon Lastik Teknolojisi"
                    fill
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,174,239,0.15)]"
                    priority
                />
            </motion.div>

            {/* Subtle glow behind the image to keep the aesthetic */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.05)_0%,transparent_70%)]" />
        </div>
    );
}

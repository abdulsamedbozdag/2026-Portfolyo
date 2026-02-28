"use client";

import { Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";

export function Loader3D() {
    const { progress } = useProgress();

    return (
        <Html center>
            <div className="flex flex-col items-center justify-center w-64 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                >
                    <span className="text-white/60 text-xs uppercase tracking-[0.3em] font-medium">
                        3D Model Yükleniyor
                    </span>
                    <div className="mt-2 text-2xl font-bold text-white tabular-nums">
                        {Math.round(progress)}%
                    </div>
                </motion.div>

                <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
            </div>
        </Html>
    );
}

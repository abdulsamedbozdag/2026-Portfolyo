"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface FloatingIconProps {
    children: React.ReactNode;
    initialX: number;
    initialY: number;
    className?: string;
    depth?: number;
}

export function FloatingIcon({ children, initialX, initialY, className = "", depth = 1 }: FloatingIconProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Base position
    const x = useMotionValue(initialX);
    const y = useMotionValue(initialY);

    // Smooth springs for movement
    const springX = useSpring(x, { stiffness: 100, damping: 20 });
    const springY = useSpring(y, { stiffness: 100, damping: 20 });

    // Subtle rotation based on movement
    const rotateX = useTransform(springY, [initialY - 100, initialY + 100], [15, -15]);
    const rotateY = useTransform(springX, [initialX - 100, initialX + 100], [-15, 15]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Project center of this item
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Distance from mouse
            const distX = mouseX - centerX;
            const distY = mouseY - centerY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            // Repulsion logic
            const radius = 300;
            if (distance < radius) {
                const force = (1 - distance / radius) * 80 * depth;
                x.set(initialX - (distX / distance) * force);
                y.set(initialY - (distY / distance) * force);
            } else {
                x.set(initialX);
                y.set(initialY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [initialX, initialY, x, y, depth]);

    return (
        <motion.div
            ref={ref}
            style={{
                x: springX,
                y: springY,
                rotateX,
                rotateY,
                perspective: 1000,
            }}
            className={`absolute select-none pointer-events-none ${className}`}
        >
            <motion.div
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="flex items-center justify-center"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

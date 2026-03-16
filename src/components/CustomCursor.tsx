"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const isHoveredRef = useRef(false);
    const rafRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(true); // Default to true to hide during SSR/initial hydration
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Precise mobile detection after mount
        const checkMobile = () => {
            return (
                window.matchMedia("(pointer: coarse)").matches ||
                "ontouchstart" in window ||
                navigator.maxTouchPoints > 0 ||
                window.innerWidth < 768 // Fallback for small screens
            );
        };

        const mobile = checkMobile();
        setIsMobile(mobile);

        if (mobile) return;

        const dot = dotRef.current;
        if (!dot) return;

        let curX = 0, curY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            if (!isVisible) setIsVisible(true);
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            isHoveredRef.current = !!(
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            );
        };

        const animate = () => {
            const { x, y } = mouseRef.current;
            if (x === 0 && y === 0) return; // Prevent initial snap

            const hovered = isHoveredRef.current;
            const size = hovered ? 48 : 16;

            curX += (x - size / 2 - curX) * 0.15;
            curY += (y - size / 2 - curY) * 0.15;

            dot.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(${hovered ? 3 : 1})`;
            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseover", onMouseOver, { passive: true });
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            cancelAnimationFrame(rafRef.current);
        };
    }, [isMobile, isVisible]);

    if (isMobile) return null;

    return (
        <div
            ref={dotRef}
            className={`fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 hidden md:block ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ willChange: "transform" }}
        />
    );
}

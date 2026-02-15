"use client";

import React, { useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────
   LIGHTWEIGHT PARTICLE CANVAS
   Pure Canvas 2D — no Three.js overhead.
   Particles react to mouse with a repel/attract effect.
   ───────────────────────────────────────────── */

interface Dot {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

const DOT_COUNT = 900;
const MOUSE_RADIUS = 180;
const RETURN_SPEED = 0.04;

export function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const dotsRef = useRef<Dot[]>([]);
    const rafRef = useRef<number>(0);
    const dprRef = useRef(1);

    const initDots = useCallback((w: number, h: number) => {
        const dots: Dot[] = [];
        for (let i = 0; i < DOT_COUNT; i++) {
            const x = Math.random() * w;
            const y = Math.random() * h;
            dots.push({
                x, y,
                baseX: x,
                baseY: y,
                vx: 0,
                vy: 0,
                radius: 1 + Math.random() * 1.5,
                opacity: 0.15 + Math.random() * 0.35,
            });
        }
        dotsRef.current = dots;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true })!;
        dprRef.current = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            const dpr = dprRef.current;
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (dotsRef.current.length === 0) {
                initDots(w, h);
            }
        };

        resize();
        window.addEventListener("resize", resize);

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
        };

        const onMouseLeave = () => {
            mouseRef.current.x = -9999;
            mouseRef.current.y = -9999;
        };

        // Touch support
        const onTouchMove = (e: TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.touches[0].clientX - rect.left;
            mouseRef.current.y = e.touches[0].clientY - rect.top;
        };

        // Listen on WINDOW so events aren't blocked by overlaying HTML elements
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onMouseLeave);

        const animate = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            ctx.clearRect(0, 0, w, h);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const dots = dotsRef.current;

            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];

                // Mouse interaction — repel
                const dx = dot.x - mx;
                const dy = dot.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_RADIUS && dist > 0) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    const angle = Math.atan2(dy, dx);
                    dot.vx += Math.cos(angle) * force * 3;
                    dot.vy += Math.sin(angle) * force * 3;
                }

                // Spring back to base position
                dot.vx += (dot.baseX - dot.x) * RETURN_SPEED;
                dot.vy += (dot.baseY - dot.y) * RETURN_SPEED;

                // Damping
                dot.vx *= 0.88;
                dot.vy *= 0.88;

                dot.x += dot.vx;
                dot.y += dot.vy;

                // Draw
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
                ctx.fill();
            }

            // Draw faint connection lines between nearby dots (limited for perf)
            ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
            ctx.lineWidth = 0.5;
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < Math.min(i + 8, dots.length); j++) {
                    const a = dots[i];
                    const b = dots[j];
                    const ddx = a.x - b.x;
                    const ddy = a.y - b.y;
                    const d = ddx * ddx + ddy * ddy;
                    if (d < 4000) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onMouseLeave);
        };
    }, [initDots]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: "block" }}
        />
    );
}

"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function CobeGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const phi = useRef(0);

    useEffect(() => {
        let width = 0;
        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener('resize', onResize);
        onResize();

        const globe = createGlobe(canvasRef.current!, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 0, // LIGHT MODE
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.95, 0.95, 0.95],
            markerColor: [0, 0.68, 0.93], // Prometeon Blue
            glowColor: [1, 1, 1],
            markers: [
                { location: [45.46, 9.19], size: 0.08 }, // Italy
                { location: [40.85, 29.88], size: 0.06 }, // Turkey
                { location: [-23.66, -46.53], size: 0.06 }, // Brazil
                { location: [31.20, 29.91], size: 0.05 }, // Egypt
                { location: [35.86, 104.19], size: 0.07 }, // China
            ],
            onRender: (state) => {
                // Auto-rotate unless interacting
                if (!pointerInteracting.current) {
                    phi.current += 0.005;
                }
                state.phi = phi.current + pointerInteractionMovement.current;
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", cursor: "grab", contain: "layout paint size" }}
            onPointerDown={(e) => {
                pointerInteracting.current = e.clientX;
                if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
            }}
            onPointerUp={() => {
                pointerInteracting.current = null;
                if (canvasRef.current) canvasRef.current.style.cursor = "grab";
            }}
            onPointerOut={() => {
                pointerInteracting.current = null;
                if (canvasRef.current) canvasRef.current.style.cursor = "grab";
            }}
            onPointerMove={(e) => {
                if (pointerInteracting.current !== null) {
                    const delta = e.clientX - pointerInteracting.current;
                    pointerInteractionMovement.current = delta * 0.01;
                }
            }}
        />
    );
}

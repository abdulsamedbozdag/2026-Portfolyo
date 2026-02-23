"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3-geo';
import { feature } from 'topojson-client';
import { motion, useSpring, useMotionValue, animate, useInView } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const PROMETEON_LOCATIONS = [
    { lat: 45.46, lng: 9.19, label: "Küresel Merkez", city: "Milano", offset: [-170, -30] }, // Sola yukarı
    { lat: 40.85, lng: 29.88, label: "Fabrika & Ar-Ge", city: "Kocaeli", offset: [20, -30] }, // Sağa yukarı
    { lat: -23.66, lng: -46.53, label: "Fabrika & Ar-Ge", city: "Santo André", offset: [-200, 0] }, // Sola
    { lat: 31.20, lng: 29.91, label: "Fabrika", city: "İskenderiye", offset: [20, 40] }, // Sağa aşağı
    { lat: 35.86, lng: 104.19, label: "Sinochem Ortaklığı", city: "Çin", offset: [20, 0] }, // Sağa
];

export default function GlobeToMap({ isDark = true }: { isDark?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.1 });
    const [isUnrolled, setIsUnrolled] = useState(false);
    const [worldData, setWorldData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // SÜRÜKLEME VE ZOOM İÇİN REFERANSLAR
    const activePointers = useRef<Map<number, { x: number, y: number }>>(new Map());
    const pointerInteracting = useRef<number | null>(null);
    const lastPinchDistance = useRef<number | null>(null);

    const t = useMotionValue(0);
    const rotation = useMotionValue(0);
    const zoom = useMotionValue(1);

    const smoothT = useSpring(t, { stiffness: 40, damping: 20 });
    const smoothRotation = useSpring(rotation, { stiffness: 40, damping: 20 });
    const smoothZoom = useSpring(zoom, { stiffness: 60, damping: 30 });

    const width = 1000;
    const height = 1000;

    // Projeksiyonlar (Ölçekler render içerisinde zoom'a göre güncellenecek)
    const projectionGlobe = useMemo(() =>
        d3.geoOrthographic().translate([width / 2, height / 2]),
        []);

    const projectionMap = useMemo(() =>
        d3.geoEquirectangular().translate([width / 2, height / 2]),
        []);

    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to load world data');
                return res.json();
            })
            .then(data => {
                const countries = feature(data, data.objects.countries);
                setWorldData(countries);
            })
            .catch(err => {
                console.error(err);
                setError("Error loading map data.");
            });
    }, []);

    useEffect(() => {
        let lastTime = performance.now();
        let frameId: number;

        const step = (time: number) => {
            if (!isInView) {
                frameId = requestAnimationFrame(step);
                return;
            }
            const deltaTime = time - lastTime;
            lastTime = time;

            const currentT = t.get();
            if (currentT < 0.99 && activePointers.current.size === 0) {
                const currentRot = rotation.get();
                const speed = 0.015 * (1 - currentT);
                rotation.set(currentRot + speed * deltaTime);
            }

            frameId = requestAnimationFrame(step);
        };

        frameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frameId);
    }, [t, rotation]);

    useEffect(() => {
        let frameId: number;

        const render = () => {
            if (!isInView) {
                frameId = requestAnimationFrame(render);
                return;
            }
            const canvas = canvasRef.current;
            if (!canvas || !worldData) return;
            const ctx = canvas.getContext('2d', { alpha: false });
            if (!ctx) return;

            const progress = smoothT.get();
            const rot = rotation.get();
            const z = smoothZoom.get();

            // Ölçekleri dinamik olarak güncelle
            projectionGlobe.scale(400 * z);
            projectionMap.scale(159 * z);

            // Başarımı artırmak için arka planı temizleme yerine boya kullanabiliriz
            // alpha: false set ettiğimiz için temiz bir zemin çizmeliyiz
            ctx.fillStyle = isDark ? '#050505' : '#fafafa';
            ctx.fillRect(0, 0, width, height);

            const project = (lng: number, lat: number) => {
                const pGlobe = projectionGlobe.rotate([-rot, -10])([lng, lat]);
                const pMap = projectionMap([lng, lat]);

                if (!pMap) return null;

                const isVisible = pGlobe !== null;

                if (!isVisible) {
                    if (progress < 0.1) return null;
                    const backProj = d3.geoEquirectangular().scale(400 * z).translate([width / 2, height / 2]).rotate([-rot, -10])([lng, lat]);
                    if (!backProj) return null;
                    return [
                        backProj[0] * (1 - progress) + pMap[0] * progress,
                        backProj[1] * (1 - progress) + pMap[1] * progress
                    ];
                }

                return [
                    pGlobe[0] * (1 - progress) + pMap[0] * progress,
                    pGlobe[1] * (1 - progress) + pMap[1] * progress
                ];
            };

            const drawPath = (geom: any) => {
                if (geom.type === 'Polygon') {
                    geom.coordinates.forEach((ring: any) => {
                        ctx.beginPath();
                        ring.forEach((coord: any, i: number) => {
                            const p = project(coord[0], coord[1]);
                            if (!p) return;
                            if (i === 0) ctx.moveTo(p[0], p[1]);
                            else ctx.lineTo(p[0], p[1]);
                        });
                        ctx.closePath();
                        ctx.stroke();
                    });
                } else if (geom.type === 'MultiPolygon') {
                    geom.coordinates.forEach((polygon: any) => {
                        polygon.forEach((ring: any) => {
                            ctx.beginPath();
                            ring.forEach((coord: any, i: number) => {
                                const p = project(coord[0], coord[1]);
                                if (!p) return;
                                if (i === 0) ctx.moveTo(p[0], p[1]);
                                else ctx.lineTo(p[0], p[1]);
                            });
                            ctx.closePath();
                            ctx.stroke();
                        });
                    });
                }
            };

            // Map lines visibility restored
            ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${0.1 * (1 - progress)})` : `rgba(33, 43, 89, ${0.15 * (1 - progress)})`;
            ctx.lineWidth = 0.5;
            const graticule = d3.geoGraticule()();
            drawPath(graticule);

            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(33, 43, 89, 0.4)';
            ctx.lineWidth = 1;
            worldData.features.forEach((f: any) => drawPath(f.geometry));

            PROMETEON_LOCATIONS.forEach((loc) => {
                const p = project(loc.lng, loc.lat);
                if (!p) return;

                const pulse = Math.sin(Date.now() / 300) * 0.2 + 1;

                // Glowing Dots
                ctx.beginPath();
                ctx.arc(p[0], p[1], 6 * pulse, 0, Math.PI * 2);
                ctx.fillStyle = '#00AEEF';
                ctx.shadowBlur = isDark ? 20 : 10;
                ctx.shadowColor = '#00AEEF';
                ctx.fill();
                ctx.shadowBlur = 0;

                // --- TEXT RENDERING WITH COLLISION MASK ---
                const textAlpha = isDark ? 0.9 : 1;

                // Set Stroke (Mask) properties
                ctx.lineWidth = 4;
                ctx.strokeStyle = isDark ? '#050505' : '#fafafa';
                ctx.lineJoin = 'round';

                const [offX, offY] = loc.offset || [16, 0];

                // City (Enlarged)
                ctx.font = '18px "JetBrains Mono", monospace';
                ctx.textAlign = 'left';
                ctx.strokeText(loc.city.toUpperCase(), p[0] + offX, p[1] + offY - 8); // Draw mask
                ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${textAlpha * 0.6})` : `rgba(15, 32, 75, ${textAlpha * 0.7})`;
                ctx.fillText(loc.city.toUpperCase(), p[0] + offX, p[1] + offY - 8);   // Draw text

                // Label (Enlarged & Bold)
                ctx.font = 'bold 22px "JetBrains Mono", monospace';
                ctx.strokeText(loc.label, p[0] + offX, p[1] + offY + 16);             // Draw mask
                ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${textAlpha})` : `rgba(15, 32, 75, ${textAlpha})`;
                ctx.fillText(loc.label, p[0] + offX, p[1] + offY + 16);               // Draw text
            });

            frameId = requestAnimationFrame(render);
        };

        frameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(frameId);
    }, [worldData, projectionGlobe, projectionMap, smoothT, smoothZoom, isDark]);

    const toggleUnroll = () => {
        const nextState = !isUnrolled;
        setIsUnrolled(nextState);
        animate(t, nextState ? 1 : 0, {
            duration: 2,
            ease: [0.16, 1, 0.3, 1]
        });
    };

    const getDistance = (p1: { x: number, y: number }, p2: { x: number, y: number }) => {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };

    return (
        <div ref={containerRef} className="w-full flex flex-col items-center justify-center gap-6">
            <div
                className="relative w-full max-w-[650px] aspect-square flex items-center justify-center rounded-full group cursor-grab active:cursor-grabbing touch-none"
                onPointerDown={(e) => {
                    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

                    if (activePointers.current.size === 1) {
                        pointerInteracting.current = e.clientX;
                    } else if (activePointers.current.size === 2) {
                        const pts = Array.from(activePointers.current.values());
                        lastPinchDistance.current = getDistance(pts[0], pts[1]);
                    }
                }}
                onPointerUp={(e) => {
                    activePointers.current.delete(e.pointerId);
                    if (activePointers.current.size < 2) lastPinchDistance.current = null;
                    if (activePointers.current.size === 0) pointerInteracting.current = null;
                }}
                onPointerCancel={(e) => {
                    activePointers.current.delete(e.pointerId);
                    if (activePointers.current.size < 2) lastPinchDistance.current = null;
                    if (activePointers.current.size === 0) pointerInteracting.current = null;
                }}
                onPointerMove={(e) => {
                    if (activePointers.current.has(e.pointerId)) {
                        activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
                    }

                    if (activePointers.current.size === 2 && lastPinchDistance.current !== null) {
                        // Pinch Zoom logic
                        const pts = Array.from(activePointers.current.values());
                        const distance = getDistance(pts[0], pts[1]);
                        const delta = (distance - lastPinchDistance.current) * 0.01;

                        const currentZoom = zoom.get();
                        const nextZoom = Math.min(Math.max(currentZoom + delta, 1), 3);
                        zoom.set(nextZoom);
                        lastPinchDistance.current = distance;
                    } else if (activePointers.current.size === 1 && pointerInteracting.current !== null && !isUnrolled) {
                        // Rotation logic
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteracting.current = e.clientX;
                        rotation.set(rotation.get() - delta * 0.3);
                    }
                }}
                onWheel={(e) => {
                    const currentZoom = zoom.get();
                    const delta = e.deltaY > 0 ? -0.1 : 0.1;
                    const nextZoom = Math.min(Math.max(currentZoom + delta, 1), 3);
                    zoom.set(nextZoom);
                }}
            >
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 z-20 backdrop-blur-sm rounded-full">
                        <div className="flex items-center gap-2 text-red-400">
                            <AlertCircle className="w-5 h-5" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    className="w-full h-full pointer-events-none"
                    style={{ filter: isDark ? 'drop-shadow(0 0 20px rgba(0,174,239,0.15))' : 'drop-shadow(0 0 20px rgba(0,174,239,0.1))' }}
                />
            </div>

            <div className="flex flex-col items-center gap-5 z-10">
                <motion.button
                    onClick={toggleUnroll}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-3 border backdrop-blur-md rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${isDark
                        ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-[#00AEEF]/50 text-white"
                        : "bg-black/5 hover:bg-black/10 border-black/10 hover:border-[#00AEEF]/50 text-[#212b59]"}`}
                >
                    {isUnrolled ? "Küresel Görünüme Dön" : "Küresel Ağı Aç"}
                </motion.button>
            </div>
        </div>
    );
}
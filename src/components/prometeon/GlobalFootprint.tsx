"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, useAspect } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// TYPES & DATA
// ---------------------------------------------------------------------------
interface Location {
    id: string;
    name: string;
    description: string;
    lat: number;
    lng: number;
}

const LOCATIONS: Location[] = [
    { id: "italy", name: "Italy", description: "Global HQ — Milan", lat: 45.4642, lng: 9.1900 },
    { id: "turkey", name: "Turkey", description: "1 Factory & R&D — İzmit", lat: 40.7654, lng: 29.9408 },
    { id: "brazil", name: "Brazil", description: "Factory & R&D — Santo André", lat: -23.6666, lng: -46.5333 },
    { id: "egypt", name: "Egypt", description: "Factory & Dev Center — Alexandria", lat: 31.2001, lng: 29.9187 },
    { id: "china", name: "China", description: "Sinochem Strategic Partner", lat: 39.9042, lng: 116.4074 },
];

// Helper to convert lat/lng to sphere coords
const latLngToSphere = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
};

// Helper to convert lat/lng to flat plane coords
const latLngToPlane = (lat: number, lng: number, width: number, height: number) => {
    const x = (lng / 180) * (width / 2);
    const y = (lat / 90) * (height / 2);
    return new THREE.Vector3(x, y, 0);
};

// ---------------------------------------------------------------------------
// MORPHING GEOMETRY COMPONENT
// ---------------------------------------------------------------------------
const MorphingMesh = ({ isFlat }: { isFlat: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const radius = 2;
    const segments = 64;

    // Create geometry and store sphere/plane positions
    const { spherePositions, planePositions } = useMemo(() => {
        const geo = new THREE.SphereGeometry(radius, segments, segments);
        const pos = geo.attributes.position;
        const count = pos.count;

        const sphereArr = new Float32Array(count * 3);
        const planeArr = new Float32Array(count * 3);

        const uv = geo.attributes.uv;
        const width = Math.PI * 2 * radius;
        const height = Math.PI * radius;

        for (let i = 0; i < count; i++) {
            // Sphere position
            sphereArr[i * 3] = pos.getX(i);
            sphereArr[i * 3 + 1] = pos.getY(i);
            sphereArr[i * 3 + 2] = pos.getZ(i);

            // Plane position mapping from UVs
            const u = uv.getX(i);
            const v = uv.getY(i);
            planeArr[i * 3] = (u - 0.5) * width;
            planeArr[i * 3 + 1] = (v - 0.5) * height;
            planeArr[i * 3 + 2] = 0;
        }

        return { spherePositions: sphereArr, planePositions: planeArr };
    }, []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        const posAttr = meshRef.current.geometry.attributes.position;
        const targetArr = isFlat ? planePositions : spherePositions;

        // Linear interpolation for vertices
        for (let i = 0; i < posAttr.count; i++) {
            const currentX = posAttr.getX(i);
            const currentY = posAttr.getY(i);
            const currentZ = posAttr.getZ(i);

            const targetX = targetArr[i * 3];
            const targetY = targetArr[i * 3 + 1];
            const targetZ = targetArr[i * 3 + 2];

            posAttr.setXYZ(
                i,
                THREE.MathUtils.lerp(currentX, targetX, 0.05),
                THREE.MathUtils.lerp(currentY, targetY, 0.05),
                THREE.MathUtils.lerp(currentZ, targetZ, 0.05)
            );
        }
        posAttr.needsUpdate = true;

        // Auto rotation when not dragging/flat
        if (!isFlat) {
            meshRef.current.rotation.y += 0.002;
        } else {
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.05);
            meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.05);
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.05);
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[radius, segments, segments]} />
            <meshBasicMaterial
                color="#ffffff"
                wireframe
                transparent
                opacity={0.15}
            />
        </mesh>
    );
};

// ---------------------------------------------------------------------------
// MARKER COMPONENT
// ---------------------------------------------------------------------------
const Marker = ({ loc, isFlat }: { loc: Location; isFlat: boolean }) => {
    const radius = 2;
    const width = Math.PI * 2 * radius;
    const height = Math.PI * radius;

    // Smoothly transition local dummy position
    const spherePos = useMemo(() => latLngToSphere(loc.lat, loc.lng, radius), [loc]);
    const planePos = useMemo(() => latLngToPlane(loc.lat, loc.lng, width, height), [loc]);

    const [currentPos, setCurrentPos] = useState(spherePos);

    useFrame(() => {
        const target = isFlat ? planePos : spherePos;
        setCurrentPos(prev => new THREE.Vector3().lerpVectors(prev, target, 0.1));
    });

    return (
        <group position={currentPos}>
            {/* The Dot */}
            <mesh>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color="#00e5ff" />
            </mesh>
            {/* The Glow */}
            <mesh scale={2.5}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshBasicMaterial color="#0f204b" transparent opacity={0.4} />
            </mesh>

            {/* Label in Flat Mode */}
            {isFlat && (
                <Html distanceFactor={10} position={[0.1, 0.1, 0]}>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10"
                    >
                        <p className="text-[10px] font-bold text-white uppercase tracking-wider">{loc.name}</p>
                        <p className="text-[8px] text-white/50 uppercase tracking-tight">{loc.description}</p>
                    </motion.div>
                </Html>
            )}
        </group>
    );
};

// ---------------------------------------------------------------------------
// MAIN GLOBAL FOOTPRINT COMPONENT
// ---------------------------------------------------------------------------
export default function GlobalFootprint() {
    const [isFlat, setIsFlat] = useState(false);

    return (
        <section className="relative w-full h-[700px] bg-[#050505] overflow-hidden flex flex-col items-center justify-center">
            {/* Title Overlay */}
            <div className="absolute top-12 left-12 z-10 pointer-events-none">
                <motion.h3
                    className="text-white text-3xl font-bold tracking-tighter uppercase mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    Global Footprint
                </motion.h3>
                <motion.p
                    className="text-white/40 text-[10px] font-mono tracking-[0.4em] uppercase"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    Infrastructure & Production Network
                </motion.p>
            </div>

            {/* Canvas */}
            <div className="w-full h-full cursor-move">
                <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
                    <color attach="background" args={["#050505"]} />
                    <ambientLight intensity={1} />

                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <MorphingMesh isFlat={isFlat} />
                        {LOCATIONS.map(loc => (
                            <Marker key={loc.id} loc={loc} isFlat={isFlat} />
                        ))}
                    </Float>

                    <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        minPolarAngle={1.2}
                        maxPolarAngle={2}
                    />
                </Canvas>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsFlat(!isFlat)}
                className="absolute bottom-12 z-10 px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-[#00e5ff] transition-colors duration-300"
            >
                {isFlat ? "Spherical Network" : "Expand Global Network"}
            </button>

            {/* Gradient Mask to transition to black bg of other sections */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </section>
    );
}

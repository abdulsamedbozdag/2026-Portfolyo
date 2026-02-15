"use client";

import React, { useRef, useState, useMemo, Suspense, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Environment,
    Text,
    Float,
    MeshReflectorMaterial,
    ContactShadows,
    useVideoTexture,
} from "@react-three/drei";
import * as THREE from "three";
import useSound from "use-sound";

/* ─────────────────────────────────────────────
   1. CURVED LED SCREEN — Video Texture + Glow
   ───────────────────────────────────────────── */
function CurvedScreen() {
    const meshRef = useRef<THREE.Mesh>(null);
    const videoTexture = useVideoTexture("/tedx/tedx-intro_1.mp4", {
        muted: true,
        loop: true,
        start: true,
        crossOrigin: "anonymous",
    });

    // Curved plane geometry via CylinderGeometry segment
    const geometry = useMemo(() => {
        const geo = new THREE.CylinderGeometry(
            12,   // radiusTop
            12,   // radiusBottom
            5,    // height
            64,   // radialSegments
            1,    // heightSegments
            true, // openEnded
            Math.PI * 0.3,  // thetaStart
            Math.PI * 0.42  // thetaLength (arc width)
        );
        // Flip UVs for correct texture display
        const uv = geo.attributes.uv;
        for (let i = 0; i < uv.count; i++) {
            uv.setX(i, 1 - uv.getX(i));
        }
        return geo;
    }, []);

    return (
        <group position={[0, 2.5, -8]}>
            {/* Screen body — dark bezzel behind video */}
            <mesh rotation={[0, Math.PI, 0]} position={[0, 0, 0.05]}>
                <cylinderGeometry args={[12.2, 12.2, 5.3, 64, 1, true, Math.PI * 0.295, Math.PI * 0.43]} />
                <meshStandardMaterial color="#080808" roughness={0.4} metalness={0.8} side={THREE.DoubleSide} />
            </mesh>

            {/* Video surface */}
            <mesh ref={meshRef} geometry={geometry} rotation={[0, Math.PI, 0]}>
                <meshStandardMaterial
                    map={videoTexture}
                    emissiveMap={videoTexture}
                    emissive="#ffffff"
                    emissiveIntensity={1.2}
                    toneMapped={false}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Title text floating over the screen */}
            <Text
                position={[0, -0.2, 1.5]}
                fontSize={0.55}
                color="#ffffff"
                maxWidth={7}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#000000"
                letterSpacing={0.08}
            >
                MERHABA BEN{"\n"}ABDUL SAMED
                <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
            </Text>

            {/* Ambient screen glow lights */}
            <pointLight position={[0, 0, 4]} intensity={80} color="#4488ff" distance={20} decay={2} />
            <pointLight position={[-3, 0, 3]} intensity={30} color="#6644ff" distance={15} decay={2} />
            <pointLight position={[3, 0, 3]} intensity={30} color="#2266ff" distance={15} decay={2} />
        </group>
    );
}

/* ─────────────────────────────────────────────
   2. CONSOLE + BUTTON — PBR Metal + Pulse
   ───────────────────────────────────────────── */
function Console({ onButtonClick }: { onButtonClick: () => void }) {
    const buttonRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.PointLight>(null);
    const [isPressed, setIsPressed] = useState(false);
    const [playClick] = useSound("/sound/engine-hover.mp3", { volume: 0.4 });

    useFrame((state) => {
        if (!buttonRef.current) return;
        const t = state.clock.elapsedTime;

        // Hue-rotating emissive
        const hue = (t * 0.15) % 1;
        const color = new THREE.Color().setHSL(hue, 0.9, 0.55);
        const mat = buttonRef.current.material as THREE.MeshPhysicalMaterial;
        mat.emissive = color;
        mat.emissiveIntensity = 1.5 + Math.sin(t * 3) * 0.8; // Pulse

        // Button press animation (lerp position)
        const targetY = isPressed ? 0.02 : 0.12;
        buttonRef.current.position.y = THREE.MathUtils.lerp(
            buttonRef.current.position.y, targetY, 0.25
        );

        // Glow light follows button color
        if (glowRef.current) {
            glowRef.current.color = color;
            glowRef.current.intensity = 15 + Math.sin(t * 3) * 8;
        }
    });

    const handlePress = useCallback(() => {
        setIsPressed(true);
        playClick();
        onButtonClick();
        setTimeout(() => setIsPressed(false), 350);
    }, [onButtonClick, playClick]);

    return (
        <group position={[0, -1.1, 3.5]}>
            {/* Console Base — Angular, premium metal */}
            <mesh castShadow position={[0, -0.3, 0]}>
                <boxGeometry args={[1.4, 0.6, 0.8]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    roughness={0.15}
                    metalness={0.95}
                    envMapIntensity={1.5}
                />
            </mesh>

            {/* Console Top Plate — Brushed metal */}
            <mesh position={[0, 0.01, 0]}>
                <boxGeometry args={[1.2, 0.04, 0.6]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.3}
                    metalness={0.9}
                />
            </mesh>

            {/* The Button — Glowing, interactive */}
            <mesh
                ref={buttonRef}
                position={[0, 0.12, 0]}
                castShadow
                onClick={handlePress}
                onPointerOver={() => { document.body.style.cursor = "pointer"; }}
                onPointerOut={() => { document.body.style.cursor = "auto"; }}
            >
                <cylinderGeometry args={[0.18, 0.2, 0.08, 32]} />
                <meshPhysicalMaterial
                    color="#111111"
                    roughness={0.05}
                    metalness={0.3}
                    transmission={0.6}
                    thickness={0.3}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    emissiveIntensity={2}
                />
            </mesh>

            {/* Button glow light */}
            <pointLight ref={glowRef} position={[0, 0.4, 0]} intensity={15} distance={5} decay={2} />

            {/* Floating CTA Label */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                <Text
                    position={[0, 0.65, 0]}
                    fontSize={0.11}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.15}
                >
                    ▼ PROJELERE GİT
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
                </Text>
            </Float>
        </group>
    );
}

/* ─────────────────────────────────────────────
   3. CAMERA RIG — Subtle idle movement
   ───────────────────────────────────────────── */
function CameraRig() {
    const { camera } = useThree();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Very subtle idle sway
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(t * 0.15) * 0.3, 0.02);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.2 + Math.sin(t * 0.2) * 0.1, 0.02);
        camera.lookAt(0, 1.2, -2);
    });

    return null;
}

/* ─────────────────────────────────────────────
   4. EXPORTED COMPONENT
   ───────────────────────────────────────────── */
export function StageHero() {
    const handleButtonClick = () => {
        const nextSection = document.getElementById("projekler");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative h-screen w-full bg-black overflow-hidden">
            <Canvas
                shadows
                dpr={[1, 1.5]}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.8 }}
                camera={{ position: [0, 2.2, 7], fov: 40 }}
            >
                <Suspense fallback={null}>
                    {/* Fog for depth */}
                    <fog attach="fog" args={["#000000", 8, 30]} />

                    {/* Lighting Rig */}
                    <ambientLight intensity={0.1} />
                    <spotLight
                        position={[0, 12, 4]}
                        angle={0.25}
                        penumbra={1}
                        intensity={80}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                        color="#ffffff"
                    />
                    <spotLight
                        position={[-6, 8, -2]}
                        angle={0.4}
                        penumbra={0.8}
                        intensity={20}
                        color="#4466ff"
                    />
                    <spotLight
                        position={[6, 6, 2]}
                        angle={0.3}
                        penumbra={0.7}
                        intensity={15}
                        color="#8844ff"
                    />

                    {/* Scene */}
                    <CurvedScreen />
                    <Console onButtonClick={handleButtonClick} />

                    {/* Reflective Floor */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
                        <planeGeometry args={[60, 60]} />
                        <MeshReflectorMaterial
                            blur={[400, 200]}
                            resolution={1024}
                            mixBlur={1}
                            mixStrength={80}
                            roughness={0.95}
                            depthScale={1.5}
                            minDepthThreshold={0.2}
                            maxDepthThreshold={1.5}
                            color="#050505"
                            metalness={0.6}
                        />
                    </mesh>

                    {/* Contact Shadows for realism */}
                    <ContactShadows
                        position={[0, -1.09, 0]}
                        opacity={0.6}
                        scale={20}
                        blur={2}
                        far={5}
                    />

                    {/* Environment — Dim city for reflections only */}
                    <Environment preset="city" environmentIntensity={0.3} />

                    {/* Camera Movement */}
                    <CameraRig />
                </Suspense>
            </Canvas>

            {/* HTML Overlay */}
            <div className="absolute top-10 left-0 right-0 z-10 flex justify-between px-8 md:px-16 pointer-events-none">
                <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-600">
                    Portfolio © 2026
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-600">
                    İstanbul, TR
                </span>
            </div>

            {/* Bottom gradient fade into page content */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
        </section>
    );
}

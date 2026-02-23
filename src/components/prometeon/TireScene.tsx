"use client";

import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    useGLTF,
    Float,
    Center,
    useProgress,
    Html,
    ContactShadows
} from "@react-three/drei";
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

// Optimization: Common decoders for optimized GLB files
const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

function TireModel({ url }: { url: string }) {
    const { scene } = useGLTF(url, DRACO_URL);

    useEffect(() => {
        if (scene) {
            console.log("3D Model Render: Model loaded successfully.");
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    if (mesh.material) {
                        const mat = mesh.material as THREE.MeshStandardMaterial;
                        // Performance: Ensure materials aren't overly complex for mobile
                        mat.side = THREE.DoubleSide;
                        if (mat.map) mat.map.anisotropy = 4;
                    }
                }
            });
        }
    }, [scene]);

    return (
        <Center top>
            <primitive object={scene} />
        </Center>
    );
}

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center gap-4 min-w-[200px] pointer-events-none">
                <div className="w-48 bg-white/5 h-[1.5px] rounded-full overflow-hidden">
                    <div
                        className="bg-[#00AEEF] h-full transition-all duration-300 shadow-[0_0_15px_#00AEEF]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-[#00AEEF] uppercase tracking-[0.4em] font-black">
                        %{progress.toFixed(0)}
                    </span>
                    <span className="text-[8px] text-white/20 uppercase tracking-widest">
                        Model Yukleniyor
                    </span>
                </div>
            </div>
        </Html>
    );
}

export function TireScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Responsive camera logic
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Performance: Only render when in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            window.removeEventListener('resize', checkMobile);
            observer.disconnect();
        };
    }, []);

    const modelUrl = "https://raw.githubusercontent.com/abdulsamedbozdag/2026-Portfolyo/main/public/prometeon/lastikler/R02_PRO_TRAILER_M1.glb";

    return (
        <div
            ref={containerRef}
            className="w-full h-full min-h-[400px] lg:min-h-[500px] bg-[#050505] flex items-center justify-center relative overflow-hidden rounded-2xl border border-white/5 shadow-2xl"
        >
            {isVisible && !hasError ? (
                <Canvas
                    shadows={false}
                    dpr={1}
                    gl={{
                        antialias: true,
                        alpha: false,
                        powerPreference: "high-performance",
                    }}
                    camera={{
                        position: isMobile ? [0, 4, 18] : [0, 5, 14], // Move camera back on mobile
                        fov: isMobile ? 45 : 35 // Increase FOV on mobile
                    }}
                    onCreated={({ gl }) => {
                        gl.setClearColor(new THREE.Color('#050505'), 1);
                    }}
                    onError={() => setHasError(true)}
                >
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 10]} intensity={1.5} />
                    <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#00AEEF" />

                    <Suspense fallback={<Loader />}>
                        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
                            <TireModel url={modelUrl} />
                        </Float>
                        <ContactShadows
                            position={[0, -2.8, 0]}
                            opacity={0.4}
                            scale={14}
                            blur={2.5}
                            far={5}
                        />
                    </Suspense>

                    <OrbitControls
                        makeDefault
                        enableZoom={true}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                        enablePan={false}
                        minDistance={isMobile ? 10 : 7}
                        maxDistance={30}
                    />
                </Canvas>
            ) : hasError ? (
                <div className="text-center px-10">
                    <p className="text-white/30 text-[10px] uppercase tracking-widest leading-relaxed">
                        3D Yukleme Hatasi
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white/5 border-t-[#00AEEF] animate-spin" />
                    <span className="text-[9px] text-white/20 uppercase tracking-widest">Baslatiliyor...</span>
                </div>
            )}

            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.03)_0%,transparent_70%)]" />
        </div>
    );
}

// Preload using the shared URL
useGLTF.preload("https://raw.githubusercontent.com/abdulsamedbozdag/2026-Portfolyo/main/public/prometeon/lastikler/R02_PRO_TRAILER_M1.glb", DRACO_URL);

"use client";

import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    useGLTF,
    Float,
    Center,
    useProgress,
    Html,
    ContactShadows,
    PerspectiveCamera
} from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Optimization: Common decoders for optimized GLB files
const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

function TireModel({ url }: { url: string }) {
    // Attempting to load with Draco support
    const { scene } = useGLTF(url, DRACO_URL);

    useEffect(() => {
        if (scene) {
            console.log("3D Model Render: Model loaded from GitHub Raw storage.");
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    if (mesh.material) {
                        const mat = mesh.material as THREE.MeshStandardMaterial;
                        if (mat.emissiveIntensity) mat.emissiveIntensity = 0.4;
                        mat.side = THREE.DoubleSide;
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
                        GitHub üzerinden yukleniyor
                    </span>
                </div>
            </div>
        </Html>
    );
}

export function TireScene() {
    const [hasError, setHasError] = useState(false);

    // GitHub RAW content URL for consistent delivery
    // Note: We use raw.githubusercontent.com for binary files
    const modelUrl = "https://raw.githubusercontent.com/abdulsamedbozdag/2026-Portfolyo/main/public/prometeon/lastikler/R02_PRO_TRAILER_M1.glb";

    return (
        <div className="w-full h-full min-h-[450px] bg-[#050505] flex items-center justify-center relative overflow-hidden rounded-2xl border border-white/5">
            {!hasError ? (
                <Canvas
                    shadows={false}
                    dpr={1}
                    gl={{
                        antialias: true,
                        alpha: false,
                        powerPreference: "high-performance",
                    }}
                    onCreated={({ gl }) => {
                        gl.setClearColor(new THREE.Color('#050505'), 1);
                    }}
                    onError={(err) => {
                        console.error("3D Canvas Error:", err);
                        setHasError(true);
                    }}
                >
                    <PerspectiveCamera makeDefault position={[0, 4, 14]} fov={35} />

                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 10]} intensity={1.5} />
                    <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#00AEEF" />

                    <Suspense fallback={<Loader />}>
                        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
                            <TireModel url={modelUrl} />
                        </Float>
                        <ContactShadows
                            position={[0, -2.8, 0]}
                            opacity={0.4}
                            scale={12}
                            blur={2.4}
                            far={5}
                        />
                    </Suspense>

                    <OrbitControls
                        makeDefault
                        enableZoom={true}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                        enablePan={false}
                        minDistance={7}
                        maxDistance={22}
                    />
                </Canvas>
            ) : (
                <div className="text-center px-10">
                    <p className="text-white/30 text-xs uppercase tracking-widest leading-relaxed">
                        3D Yukleme Hatasi.<br />
                        Lutfen internet baglantinizi kontrol edin.
                    </p>
                </div>
            )}

            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.03)_0%,transparent_70%)]" />
        </div>
    );
}

// Preload from GitHub
useGLTF.preload("https://raw.githubusercontent.com/abdulsamedbozdag/2026-Portfolyo/main/public/prometeon/lastikler/R02_PRO_TRAILER_M1.glb", DRACO_URL);

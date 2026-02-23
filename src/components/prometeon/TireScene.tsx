"use client";

import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    useGLTF,
    Float,
    Environment,
    Center,
    useProgress,
    Html
} from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Optimization: Common decoders for optimized GLB files
const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

function TireModel() {
    // Attempting to load with Draco support as "optimized" models usually require it
    const { scene } = useGLTF("/prometeon/lastikler/R02_PRO_TRAILER_M1.glb", DRACO_URL);

    useEffect(() => {
        if (scene) {
            console.log("3D Model: Successfully loaded and integrated.");
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // Desktop performance fix: Ensure textures aren't too heavy if possible
                    // (Though here we just ensure basic visibility)
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
            <div className="flex flex-col items-center gap-4 min-w-[200px]">
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div
                        className="bg-[#00AEEF] h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">
                    {progress.toFixed(0)}% Yükleniyor
                </span>
            </div>
        </Html>
    );
}

export function TireScene() {
    const [hasError, setHasError] = useState(false);

    return (
        <div className="w-full h-full min-h-[400px] bg-transparent flex items-center justify-center relative">
            <Canvas
                shadows={false}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 10], fov: 35 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                onError={(err) => {
                    console.error("Canvas Error:", err);
                    setHasError(true);
                }}
            >
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00AEEF" />

                <Suspense fallback={<Loader />}>
                    {hasError ? (
                        <Html center>
                            <span className="text-red-400 text-xs">Render Hatası</span>
                        </Html>
                    ) : (
                        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                            <TireModel />
                        </Float>
                    )}
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    makeDefault
                    enableZoom={true}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    enablePan={false}
                    minDistance={5}
                    maxDistance={15}
                />
            </Canvas>
        </div>
    );
}

// Preload is important for large models
useGLTF.preload("/prometeon/lastikler/R02_PRO_TRAILER_M1.glb", DRACO_URL);

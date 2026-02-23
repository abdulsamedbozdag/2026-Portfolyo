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
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

// Optimization: Common decoders for optimized GLB files
const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

interface TireModelProps {
    url: string;
}

function TireModel({ url }: TireModelProps) {
    // Attempting to load with Draco support
    const { scene } = useGLTF(url, DRACO_URL);

    useEffect(() => {
        if (scene) {
            console.log("3D Model Render: Model loaded from", url);
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;

                    // Critical: Fix for materials that might cause white-out or invisibility
                    if (mesh.material) {
                        const mat = mesh.material as THREE.MeshStandardMaterial;
                        // Ensure it's not glowing too much
                        if (mat.emissiveIntensity) mat.emissiveIntensity = 0.5;
                        // Force side to DoubleSide if it's "broken" or missing surfaces
                        mat.side = THREE.DoubleSide;
                    }
                }
            });
        }
    }, [scene, url]);

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
                <div className="w-48 bg-white/5 h-[2px] rounded-full overflow-hidden border border-white/5">
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
                        Model Verisi Ishleniyor
                    </span>
                </div>
            </div>
        </Html>
    );
}

export function TireScene() {
    const [hasError, setHasError] = useState(false);

    // Switch between local and cloud URL easily
    // USER: Replace this URL with your direct cloud link if local still fails
    const modelUrl = "/prometeon/lastikler/R02_PRO_TRAILER_M1.glb";

    return (
        <div className="w-full h-full min-h-[450px] bg-[#050505] flex items-center justify-center relative overflow-hidden rounded-2xl border border-white/5">
            <Canvas
                shadows={false}
                dpr={1}
                gl={{
                    antialias: true,
                    alpha: false, // NO transparency to prevent the "white box" driver bug
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor(new THREE.Color('#050505'), 1);
                    console.log("Canvas Engine: Ready");
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 4, 14]} fov={35} />

                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#00AEEF" />
                <pointLight position={[0, -5, 5]} intensity={0.5} />

                <Suspense fallback={<Loader />}>
                    {!hasError ? (
                        <group>
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
                        </group>
                    ) : (
                        <Html center>
                            <div className="text-center px-6">
                                <p className="text-red-500/80 text-[10px] uppercase font-bold tracking-widest mb-2">Render Error</p>
                                <p className="text-white/20 text-[8px] max-w-[150px]">Lütfen tarayıcı donanım hızlandırmasını kontrol edin.</p>
                            </div>
                        </Html>
                    )}
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

            {/* Visual background glow to break the solid black if needed */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.03)_0%,transparent_70%)]" />
        </div>
    );
}

// Ensure preload works for both cases
useGLTF.preload("/prometeon/lastikler/R02_PRO_TRAILER_M1.glb", DRACO_URL);

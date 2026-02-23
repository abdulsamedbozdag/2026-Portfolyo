"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Environment, Center } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function TireModel() {
    // Basic loading without draco URL for now to rule out decoder errors
    const { scene } = useGLTF("/prometeon/lastikler/R02_PRO_TRAILER_M1.glb");

    useEffect(() => {
        if (scene) {
            console.log("Model loading state: Scene ready");
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // Ensure materials are visible
                    if ((child as THREE.Mesh).material) {
                        (child as THREE.Mesh).material.transparent = false;
                        (child as THREE.Mesh).material.depthWrite = true;
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
    return (
        <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial color="red" wireframe />
        </mesh>
    );
}

export function TireScene() {
    return (
        <div className="w-full h-full min-h-[400px] bg-[#050505] flex items-center justify-center relative">
            <Canvas
                shadows={false}
                dpr={1}
                camera={{ position: [0, 0, 10], fov: 35 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                onCreated={({ gl }) => {
                    console.log("WebGL Canvas Created:", gl.capabilities.isWebGL2 ? "WebGL2" : "WebGL1");
                }}
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00AEEF" />

                <Suspense fallback={<Loader />}>
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                        <TireModel />
                    </Float>
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    makeDefault
                    enableZoom={true}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}

// Ensure preload
useGLTF.preload("/prometeon/lastikler/R02_PRO_TRAILER_M1.glb");

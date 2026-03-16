"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { Loader3D } from "../3d/Loader3D";

function PrometeonTire() {
    const { nodes } = useGLTF(
        '/prometeon/lastikler/R02_PRO_TRAILER_M1_no_materials.glb',
        'https://www.gstatic.com/draco/versioned/decoders/1.5.5/'
    );

    // Hata ayıklama için tüm mesh'leri ve boyutlarını inceleyelim
    const allMeshes = Object.values(nodes).filter((node: any) => node.isMesh);
    
    console.log("--- 3D Mesh Analizi ---");
    allMeshes.forEach((m: any) => {
        m.geometry.computeBoundingSphere();
        console.log(`Mesh: ${m.name}, Radius: ${m.geometry.boundingSphere.radius.toFixed(2)}`);
    });

    // Filtreyi teknik verilere göre optimize ediyoruz:
    // Lastik gövdesi (empty_150-161): ~60 radius
    // Lastik yanakları (Mesh_160, Mesh_161): ~450-560 radius
    // Gereksiz stüdyo/arka plan (Cylinder): ~1312 radius
    const filteredMeshes = allMeshes.filter((node: any) => {
        const radius = node.geometry.boundingSphere.radius;
        return radius < 1000; // Sadece devasa yardımcı geometrileri eler, lastiği tam bırakır.
    });

    if (filteredMeshes.length === 0) {
        console.warn("Filtreleme sonrası uygun Mesh bulunamadı! Limitleri tekrar kontrol et.");
        return null;
    }

    return (
        <group scale={0.25}>
            {filteredMeshes.map((mesh: any, idx: number) => (
                <mesh key={idx} geometry={mesh.geometry}>
                    <meshStandardMaterial
                        color="#121212"    
                        roughness={0.7}    
                        metalness={0.1}    
                    />
                </mesh>
            ))}
        </group>
    );
}

export function TireScene() {
    const [isCtrlPressed, setIsCtrlPressed] = React.useState(false);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Control") setIsCtrlPressed(true);
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Control") setIsCtrlPressed(false);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        const handleBlur = () => setIsCtrlPressed(false);
        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("blur", handleBlur);
        };
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden cursor-grab active:cursor-grabbing">
            {/* Background Glow (to help black tire visibility) */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

            <Canvas shadows camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
                <Suspense fallback={<Loader3D />}>
                    {/* Re-enabling adjustCamera to let Stage handle the base fit, matching scale for final size */}
                    <Stage environment="studio" intensity={1.5} shadows={{ type: 'contact', opacity: 0.8, blur: 2 } as any} adjustCamera={true}>
                        <PrometeonTire />
                    </Stage>

                    {/* Lighting for the sidewall - Focused on the right diagonal */}
                    <directionalLight position={[10, 5, 5]} intensity={4} color="#ffffff" />
                    <directionalLight position={[-10, 5, -5]} intensity={1} color="#ffffff" />
                    <ambientLight intensity={0.4} />

                    <OrbitControls
                        enableZoom={isCtrlPressed}
                        enablePan={false}
                        autoRotate={!isCtrlPressed}
                        rotateSpeed={0.5}
                        autoRotateSpeed={0.5}
                        makeDefault
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

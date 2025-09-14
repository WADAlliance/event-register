"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Blob component
function Blob({
    position,
    speed,
    distort,
    color,
}: {
    position: [number, number, number];
    speed: number;
    distort: number;
    color: string;
}) {
    const ref = useRef<Mesh>(null);

    // Slower rotation and wobble
    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * speed * 0.4; // slower
            ref.current.rotation.x += delta * speed * 0.2; // slower wobble
        }
    });

    return (
        <Sphere ref={ref} args={[1, 128, 128]} position={position}>
            <MeshDistortMaterial
                color={color}
                metalness={0}
                roughness={0.2}
                emissive={color}
                emissiveIntensity={1.2}
                distort={distort}
                speed={speed * 0.3} // slower distortion
            />
        </Sphere>
    );
}

// Full-screen background scene with random blobs
export default function BackgroundBlobScene() {
    const palette = ["#fbb315", "#2ca2db", "#ef5323", "#7fb842"];

    // Generate random blobs
    const sectionHeight = 40; // adjust based on your scene scale
    const blobs: Array<{
        pos: [number, number, number];
        speed: number;
        distort: number;
        color: string;
    }> = Array.from({ length: 15 }).map(() => {
        const chanceCenter = 0.2; // 20% of blobs appear near center
        let x: number;

        if (Math.random() < chanceCenter) {
            x = (Math.random() - 0.5) * 6; // center zone, smaller range
        } else {
            const side = Math.random() < 0.5 ? -1 : 1;
            x = side * (8 + Math.random() * 12); // usual side preference
        }

        const y = -sectionHeight / 2 + Math.random() * sectionHeight; // full vertical coverage
        const z = -10 - Math.random() * 30;
    
        return {
            pos: [x, y, z],
            speed: 0.5 + Math.random() * 0.5,
            distort: 0.3 + Math.random() * 0.5,
            color: palette[Math.floor(Math.random() * palette.length)],
        };
    });

    return (
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 25], fov: 75 }}>
                <ambientLight intensity={0.2} />

                {blobs.map((b, i) => (
                    <Blob key={i} position={b.pos} speed={b.speed} distort={b.distort} color={b.color} />
                ))}

                <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />

                <EffectComposer>
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1.5} height={300} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}

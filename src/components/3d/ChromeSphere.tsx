"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere, Line, Html } from "@react-three/drei";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const entities = ["Accra", "Nairobi", "Cameroon", "Nigeria", "DRC"];

// Blob component
function Blob({
    position,
    speed,
    distort,
    color,
    label
}: {
    position: [number, number, number];
    speed: number;
    distort: number;
    color: string;
    label?: string;
}) {
    const ref = useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * speed * 0.4; // slower rotation
            ref.current.rotation.x += delta * speed * 0.2; // slower wobble
        }
    });

    return (
        <group position={position}>
            <Sphere ref={ref} args={[1, 128, 128]}>
                <MeshDistortMaterial
                    color={color}
                    metalness={0}
                    roughness={0.2}
                    emissive={color}
                    emissiveIntensity={1.2}
                    distort={distort}
                    speed={speed * 0.3}
                />
            </Sphere>

            {label && (
                <Html
                    position={[0, 1.75, 0]}
                    center
                    prepend
                    distanceFactor={0.5}
                    occlude={false} 
                >
                    <div className="text-neutral-300 text-xl font-bold px-2 py-1 rounded z-20">
                        {label}
                    </div>
                </Html>
            )}
        </group>
    );
}

// Connection line between two blobs
function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
    return <Line points={[start, end]} color="#ffffff" lineWidth={0.3} opacity={0.2} />;
}

// Main background scene
export default function BackgroundBlobScene() {
    const palette = ["#fbb315", "#2ca2db", "#ef5323", "#7fb842"];
    const sectionHeight = 80; // full vertical spread

    // Generate 18 blobs
    const blobs: Array<{
        pos: [number, number, number];
        speed: number;
        distort: number;
        color: string;
        label: string | undefined;
    }> = Array.from({ length: 25 }).map(() => {
        const chanceCenter = 0.2;
        let x: number;

        if (Math.random() < chanceCenter) {
            x = (Math.random() - 0.5) * 6; // small central zone
        } else {
            const side = Math.random() < 0.5 ? -1 : 1;
            x = side * (8 + Math.random() * 12); // side-preferred placement
        }

        // Randomly assign a label to ~60% of blobs that are not near the center
        let label: string | undefined = undefined;
        if (Math.abs(x) > 5 && Math.random() < 0.6) {
            label = entities[Math.floor(Math.random() * entities.length)];
        }

        const y = -sectionHeight / 2 + Math.random() * sectionHeight; // full vertical coverage
        const z = -10 - Math.random() * 30;

        return {
            pos: [x, y, z],
            speed: 0.5 + Math.random() * 0.5,
            distort: 0.3 + Math.random() * 0.5,
            color: palette[Math.floor(Math.random() * palette.length)],
            label
        };
    });

    // Maximum distance for lines
    const maxDistance = 12;

    return (
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 25], fov: 75 }}>
                <ambientLight intensity={0.2} />

                {/* Render blobs */}
                {blobs.map((b, i) => (
                    <Blob key={i} position={b.pos} speed={b.speed} distort={b.distort} color={b.color} label={b.label} />
                ))}

                {/* Connect nearby blobs with lines */}
                {blobs.map((b1, i) =>
                    blobs.map((b2, j) => {
                        if (i < j) {
                            const dist = new Vector3(...b1.pos).distanceTo(new Vector3(...b2.pos));
                            if (dist < maxDistance) {
                                return <ConnectionLine key={`${i}-${j}`} start={b1.pos} end={b2.pos} />;
                            }
                        }
                        return null;
                    })
                )}

                <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />

                <EffectComposer>
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1.2} height={200} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}

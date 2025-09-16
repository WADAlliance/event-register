"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere, Line, Html } from "@react-three/drei";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";

const entities = ["Accra", "Nairobi", "Cameroon", "Nigeria", "DRC"];
const palette = ["#fbb315", "#2ca2db", "#ef5323", "#7fb842"];

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
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * speed * 0.4; // rotation
            ref.current.rotation.x += delta * speed * 0.2; // wobble
        }
    });

    return (
        <group position={position}>
            <Sphere args={[1, isMobile ? 32 : 128, isMobile ? 32 : 128]}>
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

function useBlobPositions(count: number, entities: string[], palette: string[]) {
    const { viewport } = useThree();
    const { width, height } = viewport;

    // generate blobs only once per mount
    return useMemo(() => {
        return Array.from({ length: count }).map(() => {
            const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
            const x = (Math.random() - 0.5) * width * 1.4;
            const y = (Math.random() - 0.5) * height * 4;
            const z = isMobile ? -8 - Math.random() * 12 : -10 - Math.random() * 30;

            let label: string | undefined;
            if (Math.abs(x) > width * 0.3 && Math.random() < 0.6) {
                label = entities[Math.floor(Math.random() * entities.length)];
            }

            return {
                pos: [x, y, z] as [number, number, number],
                speed: 0.5 + Math.random() * 0.5,
                distort: 0.3 + Math.random() * 0.5,
                color: palette[Math.floor(Math.random() * palette.length)],
                label,
            };
        });
    }, [count, width, height, entities, palette]); 
}

// Scene content that must live inside <Canvas>
function BlobField(isMobile:boolean) {
    const blobs = useBlobPositions(isMobile ? 15 : 25, entities, palette);
    const maxDistance = 12;

    return (
        <>
            {blobs.map((b, i) => (
                <Blob key={i} position={b.pos} speed={b.speed} distort={b.distort} color={b.color} label={b.label} />
            ))}

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
        </>
    );
}

// Main background scene
export default function BackgroundBlobScene() {

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    return (
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <Canvas
                camera={{
                    position: [0, 0, isMobile ? 40 : 25],
                    fov: isMobile ? 90 : 75,
                }}
            >
                <ambientLight intensity={0.2} />

                <BlobField isMobile={isMobile}/>

                <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />

                <EffectComposer>
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1.2} height={200} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}

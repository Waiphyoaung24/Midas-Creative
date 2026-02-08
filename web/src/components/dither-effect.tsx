"use client";
import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const fragmentShader = `
precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uZonePos[10]; // x, y, startTime
uniform vec3 uZoneLife[10]; // duration, maxRadius, isUser
uniform vec3 uColor1;
uniform vec3 uColor2;

float Bayer2(vec2 a) {
    a = floor(a);
    return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
#define Bayer4(a)   (Bayer2(0.5 * (a)) * 0.25 + Bayer2(a))
#define Bayer8(a)   (Bayer4(0.5 * (a)) * 0.25 + Bayer2(a))

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 fragCoord = uv * uResolution;
    float aspectRatio = uResolution.x / uResolution.y;

    float PIXEL_SIZE = 4.0; 
    vec2 pixelId = floor(fragCoord / PIXEL_SIZE);
    
    // Zone Logic
    float totalFeed = 0.0;
    
    for (int i = 0; i < 10; ++i) {
        vec3 posData = uZonePos[i];
        vec3 lifeData = uZoneLife[i];
        
        float startTime = posData.z;
        float duration = lifeData.x;
        float maxRadius = lifeData.y;
        
        if (startTime == 0.0) continue; // Inactive
        
        float age = uTime - startTime;
        
        if (age < 0.0 || age > duration) continue; // Not started or expired
        
        // Calculate lifecycle opacity (Fade In -> Sustain -> Fade Out)
        float opacity = 0.0;
        float fadeIn = duration * 0.2;
        float fadeOut = duration * 0.3;
        
        if (age < fadeIn) {
            opacity = smoothstep(0.0, fadeIn, age);
        } else if (age > (duration - fadeOut)) {
            opacity = smoothstep(duration, duration - fadeOut, age);
        } else {
            opacity = 1.0;
        }

        // Calculate Distance
        vec2 zoneCenter = (posData.xy / uResolution) * vec2(aspectRatio, 1.0);
        vec2 currentUV = uv * vec2(aspectRatio, 1.0);
        float dist = distance(currentUV, zoneCenter);
        
        // Radial Mask
        float radius = maxRadius;
        // User clicks expand, ambient ones breathe slightly
        if (lifeData.z > 0.5) { // User
             radius = maxRadius * smoothstep(0.0, fadeIn, age);
        }
        
        float zoneMask = 1.0 - smoothstep(radius * 0.5, radius, dist);
        totalFeed += zoneMask * opacity;
    }
    
    // Clamp feed
    totalFeed = clamp(totalFeed, 0.0, 1.0);

    // Bayer Dithering
    float dither = Bayer8(pixelId);
    
    // Threshold - Only show dither where feed is strong enough
    // We want a "dissolve" look at the edges
    float mask = step(dither, totalFeed);

    outputColor = vec4(mix(uColor1, uColor2, mask), 1.0);
}

void main() {
    mainImage(vec4(0.0), vUv, gl_FragColor);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

function DitherPlane() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size } = useThree();
    
    // Zone Data Management
    // We use a fixed pool of 10 zones to avoid re-allocating uniforms
    const zones = useRef({
        data: Array(10).fill(null).map(() => ({
            pos: new THREE.Vector3(0, 0, 0), // x, y, startTime
            life: new THREE.Vector3(0, 0, 0), // duration, maxRadius, isUser (1.0 = true)
            active: false
        })),
        nextIdx: 0,
        lastSpawn: 0
    });

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uZonePos: { value: zones.current.data.map(z => z.pos) },
            uZoneLife: { value: zones.current.data.map(z => z.life) },
            uColor1: { value: new THREE.Color("#000000") },
            uColor2: { value: new THREE.Color("#ffffff") },
        }),
        []
    );

    useEffect(() => {
        uniforms.uResolution.value.set(size.width, size.height);
    }, [size, uniforms]);

    const spawnZone = (x: number, y: number, isUser: boolean, time: number) => {
        const idx = zones.current.nextIdx;
        const z = zones.current.data[idx];
        
        z.pos.set(x, window.innerHeight - y, time);
        
        // Randomize life
        const duration = isUser ? 2.0 : 3.0 + Math.random() * 2.0;
        const radius = isUser ? 0.4 : 0.25 + Math.random() * 0.15; // ~25% screen coverage
        
        z.life.set(duration, radius, isUser ? 1.0 : 0.0);
        z.active = true;
        
        zones.current.nextIdx = (idx + 1) % 10;
    };

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            spawnZone(e.clientX, e.clientY, true, uniforms.uTime.value);
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [uniforms]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        uniforms.uTime.value = time;

        // Auto-spawn random zones
        // Only spawn if enough time passed AND we want to maintain some sparsity
        if (time - zones.current.lastSpawn > 1.5) {
             // Random position
             const x = Math.random() * window.innerWidth;
             const y = Math.random() * window.innerHeight;
             spawnZone(x, y, false, time);
             zones.current.lastSpawn = time;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}

export function DitherEffect() {
    return (
        <div className="fixed inset-0 -z-10 w-full h-full bg-black">
            <Canvas
                orthographic
                camera={{ left: -1, right: 1, top: 1, bottom: -1, near: 0, far: 1 }}
                gl={{ antialias: false, powerPreference: "high-performance" }}
            >
                <DitherPlane />
            </Canvas>
        </div>
    );
}



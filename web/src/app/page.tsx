"use client";

import { useEffect, useRef, useState, useLayoutEffect, Suspense } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, Float, Stars, useProgress, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Target, TrendingUp, BarChart3, Users } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Utils: SplitText Alternative (Free) ---
const SplitText = ({ children, className, delay = 0 }: { children: string, className?: string, delay?: number }) => {
  const chars = children.split("");
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".char", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ display: "inline-block" }}>
      {chars.map((char, i) => (
        <span key={i} className="char inline-block" style={{ whiteSpace: "pre" }}>
          {char}
        </span>
      ))}
    </div>
  );
};

// --- Loading Component ---
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white font-mono text-xl whitespace-nowrap">
        LOADING MODEL... {Math.round(progress)}%
      </div>
    </Html>
  )
}

function FullScreenLoader() {
  const { active, progress } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setShow(false), 500); // fade out buffer
      return () => clearTimeout(timer);
    } else {
        setShow(true);
    }
  }, [active, progress]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-500" style={{ opacity: active ? 1 : 0 }}>
      <div className="text-white font-display text-4xl mb-4 tracking-widest">MIDAS CREATIVE</div>
      <div className="w-64 h-1 bg-gray-800 rounded overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }} 
        />
      </div>
      <div className="text-gray-500 font-mono text-sm mt-2">{Math.round(progress)}%</div>
    </div>
  );
}

// --- 3D Scene Components ---

function CyberpunkBuilding({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  
  useLayoutEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 10 / maxDim;
      
      scene.scale.set(scale, scale, scale);
      scene.position.sub(center.multiplyScalar(scale));
      
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          // Monochrome material
          m.material = new THREE.MeshStandardMaterial({
            color: "#ffffff",
            metalness: 0.8,
            roughness: 0.2,
            wireframe: true,
            opacity: 0.4,
            transparent: true
          });
        }
      });
    }
  }, [scene]);

  return <primitive object={scene} />;
}

function PlaceholderModel() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 8, 4]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} wireframe />
        </mesh>
      </group>
    </Float>
  );
}

function BackgroundImage() {
  // We'll keep the screenshot but make it pure black/white/gray via color property
  const texture = useLoader(THREE.TextureLoader, "/bg-screenshot.png");
  return (
    <mesh position={[0, 0, -15]} scale={[50, 30, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={0.1} color="#ffffff" />
    </mesh>
  );
}

function SceneContent({ cameraAnimRef, targetAnimRef }: any) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { set } = useThree();

  useEffect(() => {
    if (cameraRef.current) set({ camera: cameraRef.current });
  }, [set]);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.lerp(cameraAnimRef.current, 0.1);
      cameraRef.current.lookAt(targetAnimRef.current);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={45} near={0.1} far={100} position={[0, 0, 10]} />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#ffffff" distance={20} />
      
      <Stars radius={100} depth={200} count={2000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={["#000000", 5, 50]} />

      <Suspense fallback={null}>
        <BackgroundImage />
      </Suspense>

      <group>
        <Suspense fallback={<PlaceholderModel />}>
            <CyberpunkBuilding url="/space_boi.glb" />
        </Suspense>
      </group>
      
      <gridHelper args={[40, 40, "#ffffff", "#333333"]} position={[0, -5, 0]} />
    </>
  );
}

// --- Main Page Component ---

export default function ScrollStoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  const cameraAnimRef = useRef(new THREE.Vector3(0, 3, 10));
  const targetAnimRef = useRef(new THREE.Vector3(0, 0, 0));

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const setProgressWidth = gsap.quickSetter(progressRef.current, "width", "%");
      const setProgressText = (text: string) => {
         if (progressTextRef.current) progressTextRef.current.innerText = text;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * 100;
            setProgressWidth(p);
            setProgressText(`${Math.round(p)}%`);
          }
        }
      });

      tl.to(cameraAnimRef.current, { x: 4, y: 1, z: 6, duration: 1, ease: "power1.inOut" }, 0);
      tl.to(targetAnimRef.current, { x: 0, y: 0.5, z: 0, duration: 1, ease: "power1.inOut" }, 0);
      
      tl.to(cameraAnimRef.current, { x: 0, y: 8, z: 0.1, duration: 1, ease: "power1.inOut" }, 1);
      tl.to(targetAnimRef.current, { x: 0, y: 0, z: 0, duration: 1, ease: "power1.inOut" }, 1);

      tl.to(cameraAnimRef.current, { x: -4, y: -1, z: 4, duration: 1, ease: "power1.inOut" }, 2);
      tl.to(targetAnimRef.current, { x: 0, y: 1, z: 0, duration: 1, ease: "power1.inOut" }, 2);

      tl.to(cameraAnimRef.current, { x: 0, y: 0, z: 8, duration: 1, ease: "power1.inOut" }, 3);
      tl.to(targetAnimRef.current, { x: 0, y: 0, z: 0, duration: 1, ease: "power1.inOut" }, 3);

    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Loading Screen */}
      <FullScreenLoader />

      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
          <SceneContent cameraAnimRef={cameraAnimRef} targetAnimRef={targetAnimRef} />
        </Canvas>
      </div>

      {/* UI Overlays */}
      <div className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between mix-blend-difference pointer-events-none">
        <div className="font-display font-bold tracking-widest text-white">
          MIDAS CREATIVE <span className="text-white text-xs opacity-50 block uppercase">Marketing Alchemy v1.0</span>
        </div>
        <div className="text-right font-mono text-sm text-white">
           <span ref={progressTextRef}>000%</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/10 z-50">
        <div ref={progressRef} className="h-full bg-white w-0 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
      </div>

      {/* Scrollable Content Container */}
      <div ref={containerRef} className="relative z-10 w-full">
        
        {/* Section 1: Intro */}
        <section className="h-screen flex items-center p-12 lg:p-24 pointer-events-none">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full border border-white/30 text-white text-xs font-mono mb-6 bg-black/80 backdrop-blur-md">
              STRATEGY_INITIATED
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-none">
              <SplitText>Marketing</SplitText> <br />
              <SplitText className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Revolution</SplitText>
            </h1>
            <p className="text-xl text-gray-400 max-w-md bg-black/60 backdrop-blur-xl p-6 rounded-lg border-l-2 border-white">
              Lorem ipsum dolor sit amet, marketing agency growth strategy. We transform brands through data-driven creativity and relentless execution.
            </p>
          </div>
        </section>

        {/* Section 2: Audience detail */}
        <section className="h-screen flex items-center justify-end p-12 lg:p-24 pointer-events-none">
          <div className="max-w-xl text-right">
            <div className="flex justify-end mb-6">
                <Users className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-display font-bold mb-6">
              <SplitText>Audience</SplitText> <br /> 
              <SplitText>Intelligence</SplitText>
            </h2>
            <p className="text-lg text-gray-300 bg-black/60 backdrop-blur-xl p-6 rounded-lg border-r-2 border-white inline-block">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. We map every touchpoint.
            </p>
          </div>
        </section>

        {/* Section 3: Performance */}
        <section className="h-screen flex items-center justify-center text-center p-12 pointer-events-none">
          <div className="max-w-3xl">
            <TrendingUp className="w-16 h-16 text-white mx-auto mb-8" />
            <h2 className="text-6xl font-display font-bold mb-8">
              <SplitText>Exponential</SplitText> <br />
              <SplitText>Growth</SplitText>
            </h2>
            <div className="grid grid-cols-2 gap-4 text-left max-w-lg mx-auto bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
              <div>
                <span className="block text-xs text-gray-500 uppercase tracking-widest">Conversion</span>
                <span className="text-2xl font-mono text-white">+850%</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase tracking-widest">ROI</span>
                <span className="text-2xl font-mono text-white">MAX</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Scale */}
        <section className="h-screen flex items-center p-12 lg:p-24 pointer-events-none">
          <div className="max-w-2xl">
            <Target className="w-12 h-12 text-white mb-6" />
            <h2 className="text-5xl font-display font-bold mb-8">
              <SplitText>Dominant</SplitText> <br />
              <SplitText>Market Share</SplitText>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Scale with Midas Creative.
            </p>
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full pointer-events-auto hover:bg-gray-200 transition-colors cursor-pointer uppercase tracking-tighter">
              SCALE NOW
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}
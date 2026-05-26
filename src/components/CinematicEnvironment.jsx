import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  PerspectiveCamera,
  SpotLight,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import { 
  EffectComposer, 
  Bloom, 
  Noise, 
  Vignette, 
  ChromaticAberration,
  Scanline
} from '@react-three/postprocessing';
import gsap from 'gsap';
import { useLayoutEffect } from 'react';
import { StudioUI } from './StudioUI';
import * as THREE from 'three';


function Scene() {
  const group = useRef();
  const primaryLight = useRef();
  const rimLight = useRef();
  const overheadLight = useRef();
  const ambientLight = useRef();
  const uiGroup = useRef();

  useLayoutEffect(() => {
    // Initial State: Void
    gsap.set(primaryLight.current, { intensity: 0 });
    gsap.set(rimLight.current, { intensity: 0 });
    gsap.set(overheadLight.current, { intensity: 0 });
    gsap.set(ambientLight.current, { intensity: 0 });
    gsap.set(uiGroup.current.scale, { x: 0.5, y: 0.5, z: 0.5 });
    const awakeningTl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "800 top", 
        scrub: 1,
      }
    });

    // Step 1: The Overhead Flicker (The "Studio Strike")
    awakeningTl.to(overheadLight.current, {
      intensity: 40,
      duration: 0.08,
      repeat: 4,
      yoyo: true,
      ease: "power2.inOut"
    }, 0);

    awakeningTl.to(overheadLight.current, {
      intensity: 25,
      duration: 0.5,
    }, 0.6);

    // Step 2: Main Studio Lights Reveal
    awakeningTl.to(primaryLight.current, {
      intensity: 20,
      duration: 1,
    }, 0.8);

    awakeningTl.to(rimLight.current, {
      intensity: 15,
      duration: 1,
    }, 0.8);

    awakeningTl.to(ambientLight.current, {
      intensity: 0.2,
      duration: 1,
    }, 1);

    // Step 3: UI & Lens Reveal
    awakeningTl.to(uiGroup.current.scale, {
      x: 1, y: 1, z: 1,
      duration: 1,
      ease: "back.out(1.7)"
    }, 1.2);

    // Global Move
    const globalTl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "500 top",
        end: "bottom bottom",
        scrub: 1,
      }
    });
    
    globalTl.to(group.current.position, { z: 30, ease: "none" });
    globalTl.to(group.current.rotation, { y: Math.PI * 0.15, ease: "none" }, 0);

  }, []);

  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight ref={ambientLight} intensity={0} />
      
      {/* Overhead Studio Light */}
      <SpotLight 
        ref={overheadLight}
        position={[0, 20, 0]} 
        angle={0.4} 
        penumbra={1} 
        intensity={0} 
        color="#ffffff"
        attenuation={5}
        anglePower={4}
      />

      {/* Cinematic Main Light */}
      <SpotLight 
        ref={primaryLight}
        position={[5, 10, 10]} 
        angle={0.2} 
        penumbra={1} 
        intensity={0} 
        castShadow 
        color="#ffffff"
        attenuation={5}
        anglePower={5}
      />

      {/* Dramatic Rim Light */}
      <SpotLight 
        ref={rimLight}
        position={[-10, 5, -10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0} 
        color="#00ffff"
        attenuation={5}
      />
      
      <group ref={group}>
        <group ref={uiGroup}>
          <StudioUI />
        </group>

        <Points count={3000} />
        
        <ContactShadows 
          position={[0, -10, 0]} 
          opacity={0.4} 
          scale={40} 
          blur={2} 
          far={15} 
          color="#000000" 
        />
      </group>

      <Environment preset="studio" />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} intensity={1.5} radius={0.5} />
        <Vignette eskil={false} offset={0.1} darkness={1.2} />
        <ChromaticAberration offset={[0.003, 0.003]} />
      </EffectComposer>
    </>
  );
}

function Points({ count = 3000 }) {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 80;
      p[i * 3 + 1] = (Math.random() - 0.5) * 60;
      p[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    return p;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.z = time * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={particles} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.3} sizeAttenuation={true} />
    </points>
  );
}

export function CinematicEnvironment() {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={35} />
        <Scene />
      </Canvas>
    </div>
  );
}





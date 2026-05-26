import React, { useMemo, useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function StudioUI() {
  return (
    <group position={[0, 0, -5]}>
      <Waveform position={[-4, -2, 0]} color="#00ffff" />
      <Waveform position={[4, -2, 0]} color="#ff00ff" />
      <TimelineMarkers />
      <StatusIndicators />
    </group>
  );
}

function Waveform({ position, color }) {
  const geomRef = useRef();
  const count = 50;
  
  const points = useMemo(() => {
    return new Float32Array(count * 3);
  }, []);

  useFrame((state) => {
    if (geomRef.current) {
      const time = state.clock.getElapsedTime();
      const attr = geomRef.current.attributes.position;
      for (let i = 0; i < count; i++) {
        const x = i * 0.1;
        const y = Math.sin(time * 5 + i * 0.5) * 0.5 * Math.sin(time * 2);
        attr.setXYZ(i, x, y, 0);
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
      <line>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.5} />
      </line>
    </group>
  );
}

function TimelineMarkers() {
  return (
    <group position={[0, -3.5, 0]}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[(i - 10) * 1, 0, 0]}>
          <boxGeometry args={[0.02, 0.2, 0.01]} />
          <meshBasicMaterial color="white" transparent opacity={0.2} />
        </mesh>
      ))}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.2}
        color="white"
      >
        00:00:12:15
      </Text>
    </group>
  );
}

function StatusIndicators() {
  return (
    <group position={[-6, 3, 0]}>
      <Text
        fontSize={0.15}
        color="#00ffff"
      >
        REC_READY
      </Text>
      <mesh position={[1, 0, 0]}>
        <circleGeometry args={[0.05, 32]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
    </group>
  );
}

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function RotatingHologram() {
  const meshRef = useRef();
  const outerMeshRef = useRef();
  const pointsRef = useRef();

  const count = 180;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 1.3 + Math.random() * 0.9; 

      arr[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = dist * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = elapsedTime * 0.12;
      meshRef.current.rotation.x = elapsedTime * 0.06;
    }
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y = -elapsedTime * 0.08;
      outerMeshRef.current.rotation.z = elapsedTime * 0.04;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -elapsedTime * 0.05;
      pointsRef.current.rotation.x = elapsedTime * 0.03;
    }
  });

  return (
    <group>
      {/* 3D Holographic Wireframe Core Shape */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#1cd8d2"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Outer Faceted Hologram Ring */}
      <mesh ref={outerMeshRef} scale={1.05}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#00bf8f"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Orbiting Particle Stars Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#1cd8d2"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function HologramCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-45 select-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <RotatingHologram />
      </Canvas>
    </div>
  );
}

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Torus, Environment } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GoldSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#c9a962"
          metalness={0.95}
          roughness={0.1}
          distort={0.2}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

function FloatingRing({ position, size }: { position: [number, number, number]; size: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <Torus ref={meshRef} args={[size, 0.05, 16, 100]} position={position}>
        <meshStandardMaterial color="#c9a962" metalness={0.9} roughness={0.15} />
      </Torus>
    </Float>
  );
}

function Particles() {
  const count = 50;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const x = Math.sin(t * Math.PI * 4 + time * 0.3) * 4;
      const y = Math.cos(t * Math.PI * 6 + time * 0.2) * 3;
      const z = Math.sin(t * Math.PI * 2 + time * 0.4) * 2 - 2;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.02 + Math.sin(time + i) * 0.01);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#c9a962" emissive="#c9a962" emissiveIntensity={0.5} />
    </instancedMesh>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#c9a962" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b7355" />
        <GoldSphere />
        <FloatingRing position={[-2.5, 1.5, -1]} size={0.8} />
        <FloatingRing position={[2.8, -1, -1.5]} size={0.6} />
        <Particles />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

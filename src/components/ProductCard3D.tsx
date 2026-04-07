import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, RoundedBox, Environment } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ProductShape({ color, category }: { color: string; category: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const getGeometry = () => {
    switch (category) {
      case 'Watches':
        return (
          <Float speed={2} rotationIntensity={0.3}>
            <mesh ref={meshRef}>
              <torusGeometry args={[0.7, 0.25, 16, 48]} />
              <MeshDistortMaterial color={color} metalness={0.95} roughness={0.05} distort={0.1} speed={2} />
            </mesh>
          </Float>
        );
      case 'Sneakers':
        return (
          <Float speed={2.5} rotationIntensity={0.4}>
            <RoundedBox ref={meshRef} args={[1.2, 0.5, 0.8]} radius={0.15} smoothness={4}>
              <MeshDistortMaterial color={color} metalness={0.7} roughness={0.2} distort={0.15} speed={3} />
            </RoundedBox>
          </Float>
        );
      case 'Bags':
        return (
          <Float speed={1.8} rotationIntensity={0.3}>
            <RoundedBox ref={meshRef} args={[0.9, 1.1, 0.4]} radius={0.1} smoothness={4}>
              <MeshDistortMaterial color={color} metalness={0.8} roughness={0.15} distort={0.08} speed={1.5} />
            </RoundedBox>
          </Float>
        );
      default:
        return (
          <Float speed={3} rotationIntensity={0.5}>
            <mesh ref={meshRef}>
              <octahedronGeometry args={[0.7, 0]} />
              <MeshDistortMaterial color={color} metalness={0.9} roughness={0.1} distort={0.2} speed={2.5} />
            </mesh>
          </Float>
        );
    }
  };

  return getGeometry();
}

export default function ProductCard3D({ color, category }: { color: string; category: string }) {
  return (
    <div className="w-full h-48 sm:h-56">
      <Canvas camera={{ position: [0, 0, 3], fov: 40 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-2, -2, 2]} intensity={0.4} color={color} />
        <ProductShape color={color} category={category} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

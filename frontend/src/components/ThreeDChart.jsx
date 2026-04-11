import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Scatter3DPoints({ data }) {
  const ref = useRef();
  
  const positions = data.map(d => [
    (d.x / 100000000) * 2,
    (d.y / 100000000) * 2,
    d.z / 10
  ]).flat();

  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Points ref={ref} positions={new Float32Array(positions)} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function RotatingSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial color="#3b82f6" wireframe />
    </mesh>
  );
}

function DataNodes3D({ movies }) {
  const groupRef = useRef();

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={groupRef}>
      {movies.slice(0, 20).map((movie, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 2 + Math.random();
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle * 0.5) * radius * 0.5;
        const z = Math.sin(angle) * radius;
        const scale = 0.05 + (movie.revenue / 3000000000) * 0.1;

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[scale, 16, 16]} />
            <meshStandardMaterial
              color={movie.revenue > 1000000000 ? '#22c55e' : movie.revenue > 500000000 ? '#3b82f6' : '#f59e0b'}
              emissive={movie.revenue > 1000000000 ? '#22c55e' : '#3b82f6'}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ThreeDChart({ movies = [] }) {
  const sampleData = movies.length > 0 ? movies.slice(0, 20).map(m => ({
    x: m.budget,
    y: m.revenue,
    z: m.popularity
  })) : [
    { x: 237000000, y: 2923706026, z: 150 },
    { x: 356000000, y: 2799439100, z: 200 },
    { x: 200000000, y: 2264438822, z: 90 },
    { x: 245000000, y: 2068350756, z: 120 },
    { x: 150000000, y: 1370995259, z: 110 },
  ];

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <DataNodes3D movies={sampleData} />
        <RotatingSphere />
      </Canvas>
    </div>
  );
}


import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Float, Environment } from '@react-three/drei';
import { gsap } from 'gsap';

interface ParticleProps {
  count: number;
  shape?: 'sphere' | 'cube';
  size?: number;
  color?: string;
  speed?: number;
}

export const Particles = ({ count = 1000, shape = 'sphere', size = 0.02, color = '#9b87f5', speed = 0.1 }: ParticleProps) => {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = new THREE.Object3D();
  const positions = useRef<Float32Array>(new Float32Array(count * 3));
  const velocities = useRef<Float32Array>(new Float32Array(count * 3));
  
  useEffect(() => {
    // Initialize particle positions and velocities
    for (let i = 0; i < count; i++) {
      if (shape === 'sphere') {
        const radius = 3;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions.current[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions.current[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions.current[i * 3 + 2] = radius * Math.cos(phi);
      } else {
        positions.current[i * 3] = (Math.random() - 0.5) * 5;
        positions.current[i * 3 + 1] = (Math.random() - 0.5) * 5;
        positions.current[i * 3 + 2] = (Math.random() - 0.5) * 5;
      }
      
      velocities.current[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities.current[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities.current[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
  }, [count, shape]);
  
  useFrame(({ mouse, viewport }, delta) => {
    // Update particles
    for (let i = 0; i < count; i++) {
      // Apply velocity
      positions.current[i * 3] += velocities.current[i * 3] * speed;
      positions.current[i * 3 + 1] += velocities.current[i * 3 + 1] * speed;
      positions.current[i * 3 + 2] += velocities.current[i * 3 + 2] * speed;
      
      // Influence from mouse
      const x = (mouse.x * viewport.width) / 10;
      const y = (mouse.y * viewport.height) / 10;
      
      positions.current[i * 3] += (x - positions.current[i * 3]) * 0.0005;
      positions.current[i * 3 + 1] += (y - positions.current[i * 3 + 1]) * 0.0005;
      
      // Set instance position
      dummy.position.set(
        positions.current[i * 3],
        positions.current[i * 3 + 1],
        positions.current[i * 3 + 2]
      );
      
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </instancedMesh>
  );
};

export const FloatingLogo = () => {
  const group = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    group.current.rotation.y = Math.sin(clock.getElapsedTime() / 2) * 0.3;
  });
  
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <group ref={group}>
        <mesh>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial 
            color="#8B5CF6" 
            wireframe={true}
            emissive="#8B5CF6"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial 
            color="#1EAEDB" 
            wireframe={false}
            transparent
            opacity={0.4}
            emissive="#1EAEDB"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
};

export const ProjectSphere = ({ index, hovered, position }: { index: number, hovered: boolean, position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useEffect(() => {
    if (hovered) {
      gsap.to(meshRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.5, ease: "power2.out" });
      gsap.to(meshRef.current.material, { emissiveIntensity: 0.8, duration: 0.5 });
    } else {
      gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(meshRef.current.material, { emissiveIntensity: 0.3, duration: 0.5 });
    }
  }, [hovered]);
  
  const colors = ['#9b87f5', '#1EAEDB', '#D946EF'];
  const color = colors[index % colors.length];
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.5}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

export const BgScene = () => {
  return (
    <>
      <Particles count={200} color="#9b87f5" shape="sphere" size={0.02} speed={0.05} />
      <Environment preset="city" />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#9b87f5" />
    </>
  );
};

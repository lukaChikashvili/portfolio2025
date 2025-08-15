import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FireFlies = () => {

    useFrame(() => {
        fireflies.current.forEach((firefly, idx) => {
            const time = 0.025 + idx;
            firefly.position.x += Math.sin(time * 0.3) * 0.01;
            firefly.position.y += Math.cos(time * 0.4) * 0.01;
            firefly.position.z += Math.sin(time * 0.2) * 0.01;
          });
    })
    
    const fireflies = useRef([]);

    const createFireflies = (count) => {
      const positions = [];
      for (let i = 0; i < count; i++) {
        positions.push([
          (Math.random() - 0.5) * 100, 
          Math.random() * 13 + 3,
          (Math.random() - 0.5) * 15, 
        ]);
      }
      return positions;
    };
  
    const fireflyPositions = createFireflies(400);



  

  return (
   <>
       {fireflyPositions.map((pos, idx) => (
        <Float key={idx} speed={1} rotationIntensity={1.5} floatIntensity={2}>
          <mesh
            ref={(el) => (fireflies.current[idx] = el)}
            position={pos}
            scale={0.04}
          >
            <sphereGeometry />
            <meshStandardMaterial color="#FABC3F" emissive="#FFD700" emissiveIntensity={2} />
          </mesh>
          
        </Float>
      ))}
   
   </>
  )
}

export default FireFlies

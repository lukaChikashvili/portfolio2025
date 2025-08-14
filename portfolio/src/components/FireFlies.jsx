import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FireFlies = ({ count = 50, area = 20}) => {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const arr = [];
        for (let i = 0; i < count; i++) {
          const radius = Math.random() * (area / 2);       
          const theta = Math.random() * 10 * Math.PI;       
          const phi = Math.acos(2 * Math.random() - 1);    
      
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);
      
          arr.push(x, y, z);
        }
        return new Float32Array(arr);
      }, [count, area]);


const velocities = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(
        (Math.random() - 0.5) * 0.02, 
        (Math.random() - 0.5) * 0.01, 
        (Math.random() - 0.5) * 0.02
      );
    }
    return arr;
  }, [count]);


  useFrame(() => {
    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      positionsArray[i * 3 + 0] += velocities[i * 3 + 0];
      positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

 
      for (let j = 0; j < 3; j++) {
        if (positionsArray[i * 3 + j] > area / 2) velocities[i * 3 + j] *= -1;
        if (positionsArray[i * 3 + j] < -area / 2) velocities[i * 3 + j] *= -1;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
   <>
   
   <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffff88"
        size={0.2}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
   </>
  )
}

export default FireFlies

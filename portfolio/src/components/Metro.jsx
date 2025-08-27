import { useGLTF, useTexture } from '@react-three/drei'
import React from 'react'
import Train from './Train'
import * as THREE from 'three'

const Metro = () => {

  const tile = useTexture('./tile.jpg');


  tile.wrapS = THREE.ClampToEdgeWrapping;
  tile.wrapT = THREE.ClampToEdgeWrapping;
  tile.repeat.set(0, 1);

  return (
    <>
      
            <group position={[0, -29, 0]}>
      {/* Floor */}
      <mesh receiveShadow >
        <boxGeometry args={[200, 0.8, 57]} />
         <meshBasicMaterial map = {tile} />
      </mesh>
     

      {/* Ceiling */}
      <mesh position={[0, 15, 0]}>
        <boxGeometry args={[200, 0.5, 50]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 4, -25]}>
        <boxGeometry args={[200, 30, 0.8]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-100, 4, 0]}>
        <boxGeometry args={[0.5, 30, 50]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[100, 4, 0]}>
        <boxGeometry args={[0.5, 30, 50]} />
        <meshStandardMaterial color="#444" />
      </mesh>

<Train />
      
    </group>

   
    </>
  )
}

export default Metro

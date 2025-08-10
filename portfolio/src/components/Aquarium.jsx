import React from 'react'
import * as THREE from 'three'

const Aquarium = () => {
  return (
    <>
      <mesh position={[-5, 12.4, 5]}>
      <boxGeometry args={[3, 1, 3]} />
      <meshPhysicalMaterial
        color="#a0c8f0"
        transmission={0.9}      
        thickness={0.1}        
        roughness={0}         
        metalness={0}           
        clearcoat={1}          
        clearcoatRoughness={0}  
        side={THREE.DoubleSide} 
        transparent
        opacity={0.8}
      />
    </mesh>

    <mesh position={[-5, 12.4, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 2.5]} />
        <meshStandardMaterial color="#44aacc" roughness={0.5} />
      </mesh>
    </>
  )
}

export default Aquarium

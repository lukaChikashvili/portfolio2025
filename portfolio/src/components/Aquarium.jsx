import { waterFragment } from '@/shaders/aqarium/fragment'
import { waterVertex } from '@/shaders/aqarium/vertex'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

const Aquarium = () => {
   
    const debugObject = {};

    debugObject.depthColor = '#0a2a4d';
    debugObject.surfaceColor = '#1ca3ec';

    const uniforms = useRef({
        uTime: {value: 0},
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(2.75, 1.1) },
        uDepthColor: { value: new THREE.Color(debugObject.depthColor)},
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor)},
        uColorOffset: { value: 0.12},
        uColorMultiplier: { value: 5}
      });
    
      useFrame(() => {
         uniforms.current.uTime.value += 0.0025;
      })
    

  return (
    <>
      <mesh position={[-5, 12.4, 5]}>
      <boxGeometry args={[4, 2, 3]} />
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

    <mesh position={[-5, 12.2, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 2.9, 800, 800]} />
        <shaderMaterial vertexShader={waterVertex}
         fragmentShader={waterFragment} uniforms={uniforms.current} />
      </mesh>
    </>
  )
}

export default Aquarium

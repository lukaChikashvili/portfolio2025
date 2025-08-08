import { grassFragment } from '@/shaders/grass/fragment'
import { grassVertex } from '@/shaders/grass/vertex'
import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

const Experience = () => {

    const shaderRef = useRef();


    const grassUniforms = useRef({
        uTime: { value: 0},
        uSeason: { value: 2.3}
    });

    useFrame((state) => {
        const elapsed = state.clock.getElapsedTime();
  
        grassUniforms.current.uTime.value += 0.025;
       

  
       
      });

    
  return (
    <>
       <OrbitControls makeDefault />

       {/* Grass Field */}
       <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[400, 400, 500, 500]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={grassVertex}
          fragmentShader={grassFragment}
          uniforms={grassUniforms.current}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}

export default Experience

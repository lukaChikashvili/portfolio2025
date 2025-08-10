import { flagFragment } from '@/shaders/flags/fragment'
import { flagVertex } from '@/shaders/flags/vertex'
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'
import * as THREE from 'three'

const Menu = () => {

    const shaderRef = useRef();

    const projectTexture = useTexture('./projects.png');


    
    const uniforms = useRef({
        uTime: { value: 0 },
        uAmplitude: { value: 0.5},
        uFrequency:  {value: new THREE.Vector2(1.85, 1.0)},
        uSpeed: { value: 3.0},
        uTexture: { value: projectTexture}
    });

    useFrame(({ clock }) => {
        if (shaderRef.current) {
          shaderRef.current.uniforms.uTime.value = clock.elapsedTime
        }
      })


  return (
   <>
     <mesh rotation = {[-0.2, -0.7, 0]} position={[-20, 10, 0]}>
         <planeGeometry args = {[3, 10, 128, 128]} />
         <shaderMaterial ref={shaderRef} wireframe = {true} 
           side={THREE.DoubleSide}
         vertexShader={flagVertex} fragmentShader={flagFragment} uniforms={uniforms.current} />
     </mesh>
   </>
  )
}

export default Menu

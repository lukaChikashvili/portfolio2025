import { grassFragment } from '@/shaders/grass/fragment'
import { grassVertex } from '@/shaders/grass/vertex'
import { Environment, OrbitControls, Text, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
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
       
      // sign menu
      const signs = useMemo(() => [
        { label: 'Projects', position: [-20, 0, -30] },
        { label: 'About', position: [-10, 0, -50] },
        { label: 'Contact', position: [5, 0, -25] },
        { label: 'Contact', position: [10, 0, -65] }
      ], []);



      // models
      const piano  = useGLTF('./piano.glb');
      const sign = useGLTF('./sign.glb');



    
  return (
    <>
       <OrbitControls makeDefault />

       <Environment preset="forest"  />

       {/* Grass Field */}
       <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[400, 400, 600, 600]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={grassVertex}
          fragmentShader={grassFragment}
          uniforms={grassUniforms.current}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Piano Model */}
      <primitive object={piano.scene} />
      
       {signs.map((item, i) => {
        const clonedSign = sign.scene.clone(true);

        return(
            <group
            key={i}
            position={item.position}
           
          >
            <primitive object={clonedSign} scale={5} />
           
          </group>
        )
       })}

    </>
  )
}

export default Experience

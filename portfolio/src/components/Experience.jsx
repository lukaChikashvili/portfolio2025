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
      const tree = useGLTF('./tree.glb');

      const getRandomTrees = (count, tree) => {
         const treeArr = [];


          for(let i = 0; i < count; i++) {
            const clonedTree = tree.scene.clone(true);

            const x = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            const y = 0;

            clonedTree.position.set(x, y, z);


            treeArr.push(
                <primitive key={i} object={clonedTree} />
            )

          }

          return treeArr;


      }




    
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

   {getRandomTrees(10, tree)}

    </>
  )
}

export default Experience

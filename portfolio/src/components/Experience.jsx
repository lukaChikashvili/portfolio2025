import { grassFragment } from '@/shaders/grass/fragment'
import { grassVertex } from '@/shaders/grass/vertex'
import { Environment, OrbitControls, Sky, Stars, Text, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import Smoke from './Smoke'
import Menu from './Menu'
import House from './House'
import Aquarium from './Aquarium'
import Metro from './Metro'


const Experience = ({ isNight}) => {

    const shaderRef = useRef();


    const grassUniforms = useRef({
        uTime: { value: 0},
        uSeason: { value: 2.3}
    });

    useEffect(() => {
      grassUniforms.current.uSeason.value = isNight ? 0.3 : 2.3;
    }, [isNight]);

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

      // house
      const houses = useMemo(() => [
        { position: [-40, 0, -120], scale: 0.8 },
        { position: [60, 0, -140], scale: 0.85 },
        { position: [-70, 0, -130], scale: 0.75 },
        { position: [30, 0, -110], scale: 0.9 },
        { position: [50, 0, -120], scale: 0.8 },
        { position: [120, 0, -170], scale: 0.85 },
        { position: [0, 0, -130], scale: 0.75 },
        { position: [140, 0, -110], scale: 0.9 },
      ], []);




      // models
      const piano  = useGLTF('./piano.glb');
      const sign = useGLTF('./sign.glb');
      const tree = useGLTF('./tree.glb');
      const house = useGLTF('./house.glb');
      const book = useGLTF('./book.glb');
      const notes = useGLTF('./notes.glb');
      const candle = useGLTF('./candle.glb');


      const [noteMeshes, setNoteMeshes] = useState([]);
      const startTimes = useRef([]);

      useEffect(() => {
        const meshes = [];
        notes.scene.traverse((child) => {
          if (child.isMesh) {
            const clone = child.clone();
            clone.scale.set(0.04, 0.04, 0.04);
            clone.material = clone.material.clone(); 
            clone.material.transparent = true;
            meshes.push(clone);
          }
        });
    
       
        const clones = [];
        for (let i = 0; i < 8; i++) {
          const m = meshes[i % meshes.length].clone();
          m.position.set(0, 20, 0);
          clones.push(m);
        }
    
        setNoteMeshes(clones);
        startTimes.current = clones.map((_, i) => -i * 0.5); 
      }, [notes]);
    

      useFrame((state) => {
        const elapsed = state.clock.getElapsedTime();
    
        noteMeshes.forEach((mesh, i) => {
          const t = elapsed - startTimes.current[i];
    
          if (t >= 0) {
            mesh.visible = true;
            mesh.position.y = 10 + t * 1.5;
            mesh.position.x = Math.sin(t * 2) * 0.5; 
            mesh.rotation.y += 0.02;
            mesh.material.opacity = THREE.MathUtils.clamp(1 - t / 2, 0, 1);
    
           
            if (mesh.position.y > 40 || mesh.material.opacity <= 0) {
              startTimes.current[i] = elapsed;
              mesh.position.set(0, 20, 0);
              mesh.material.opacity = 1;
            }
          }
        });
      });


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
      <group position={[0, 0, 0]}>
        <primitive object={piano.scene} />
        
      {/*noteMeshes.map((mesh, i) => (
        <primitive key={i} object={mesh} />
      ))*/}
      </group>
      
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


{houses.map((item, i) => {
        const clonedHouse = house.scene.clone(true);

        return(
            <group
            key={i}
            position={item.position}
           
          >
            <primitive object={clonedHouse} scale={5} />
           
          </group>
        )
       })}


  

   {getRandomTrees(0, tree)}
   
  
   <primitive object={candle.scene} scale = {16} position = {[15, -13, 18]} />

  {/* Smoke effect */}
  <Smoke />

   {/* Menu Flags */}
   <Menu />

   <Stars />

   <Sky
      distance={450000}        
      sunPosition={[0, isNight ? 0 : 10, 0]} 
      inclination={0}          
      azimuth={0.25}           
      turbidity={2}            
      rayleigh={0.1}           
      mieCoefficient={0.005}   
      mieDirectionalG={0.8}    
      elevation={-10}          
    
    />

 {/* House wall */}
  <House />

{/* Aquarium */}
<Aquarium />

{/* Metro */}
<Metro />
    </>
  )
}

export default Experience

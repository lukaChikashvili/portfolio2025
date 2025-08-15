import { useGLTF, useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import Flag from './Flag';
import { goBack } from './GoBack';
import { useFrame, useThree } from '@react-three/fiber';
import { clothVertex } from '@/shaders/cloth/vertex';
import { clothFragment } from '@/shaders/cloth/fragment';
import * as THREE from 'three'


const ChainGroup = ({ position, imageUrl }) => {
    const chain = useGLTF("./chain.glb");

    const texture = useTexture(imageUrl);


    const uniforms = useRef({
      uTime: { value: 0},
      uColor: { value: new THREE.Color("#ffffff")},
      uAmplitude: { value: 0.2 },
    uFrequency: { value: new THREE.Vector2(0.5, 0.5) },
    uSpeed: { value: 1.0 },
    uTexture: { value: texture}
    });

    useFrame(() => {
      uniforms.current.uTime.value += 0.025;
    });

    
  
    return (
      <group position={position}>
        <primitive
          object={chain.scene.clone()} 
          scale={0.3}
          position={[0, 0, -0.6]}
        />
        <mesh rotation={[0, -0.4, 0]}>
          <planeGeometry args={[8, 5, 500, 500]} />
          <shaderMaterial vertexShader={clothVertex} 
          fragmentShader={clothFragment} uniforms={uniforms.current}/>
        </mesh>
      </group>
    );
  };



  const Projects = () => {
    const projectImages = [
      "./tamada.png",
      "./vote.png",
      "./girl.png"
    ];
  
    const { camera } = useThree();
  
    return (
      <>
        {projectImages.map((img, i) => (
          <ChainGroup
            key={i}
            position={[20 + i * 20, 12, -55]}
            imageUrl={img}
          />
        ))}
  
        <mesh position={[10, 11, -64]} onClick={() => goBack(camera)}>
          <planeGeometry args={[7, 2]} />
          <meshStandardMaterial map={useTexture('./project.png')} />
        </mesh>
      </>
    );
  };

  export default Projects;
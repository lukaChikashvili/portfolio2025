import { useGLTF, useTexture } from '@react-three/drei'
import React, { useRef, useState, forwardRef } from 'react'
import { goBack } from './GoBack';
import { useFrame, useThree } from '@react-three/fiber';
import { clothVertex } from '@/shaders/cloth/vertex';
import { clothFragment } from '@/shaders/cloth/fragment';
import * as THREE from 'three'
import gsap from 'gsap'

const ChainGroup = forwardRef(({ position, imageUrl }, ref) => {
  const chain = useGLTF("./chain.glb");
  const texture = useTexture(imageUrl);

  const uniforms = useRef({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#ffffff") },
    uAmplitude: { value: 0.2 },
    uFrequency: { value: new THREE.Vector2(0.5, 0.5) },
    uSpeed: { value: 1.0 },
    uTexture: { value: texture }
  });

  useFrame(() => {
    uniforms.current.uTime.value += 0.025;
  });

  return (
    <group ref={ref} position={position}>
      <primitive
        object={chain.scene.clone()}
        scale={0.3}
        position={[0, 0, -0.6]}
      />
      <mesh rotation={[0, -0.4, 0]}>
        <planeGeometry args={[8, 5, 500, 500]} />
        <shaderMaterial
          vertexShader={clothVertex}
          fragmentShader={clothFragment}
          uniforms={uniforms.current}
        />
      </mesh>
    </group>
  );
});

const Projects = () => {
  const { camera } = useThree();

  const projectImages = [
    "./tamada.png",
    "./vote.png",
    "./girl.png"
  ];

  const [images, setImages] = useState(projectImages);

  const chainRefs = useRef([]);

  const initialPositions = [
    [20, 12, -55],
    [40, 12, -55],
    [60, 12, -55],
    [80, 12, -55],
    [100, 12, -55],
    [120, 12, -55]
  ];

  const handleNext = () => {
    chainRefs.current.forEach((ref) => {
      if (ref) {
        gsap.to(ref.position, {
          x: ref.position.x - 20, 
          duration: 1,
          ease: "power2.inOut"
        });
      }
    });

    
  
  };


  const handlePrev = () => {
    chainRefs.current.forEach((ref) => {
      if (ref) {
        gsap.to(ref.position, {
          x: ref.position.x + 20, 
          duration: 1,
          ease: "power2.inOut"
        });
      }
    });
  }

  return (
    <>
      {images.map((img, i) => (
        <ChainGroup
          key={i}
          ref={(el) => (chainRefs.current[i] = el)}
          position={initialPositions[i]}
          imageUrl={img}
        />
      ))}

      {/* Go back button */}
      <mesh position={[10, 11, -64]} onClick={() => goBack(camera)}>
        <planeGeometry args={[7, 2]} />
        <meshStandardMaterial map={useTexture('./project.png')} />
      </mesh>

      {/* Next button */}
      <mesh position={[20, 10, -50]} onClick={handleNext}>
        <planeGeometry args={[3, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

        {/* prev button */}
        <mesh position={[24, 10, -50]} onClick={handlePrev}>
        <planeGeometry args={[3, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
};

export default Projects;

import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react';

const Lights = ({ nightMode }) => {
  const sun = useRef();
  const { scene } = useThree();

  useEffect(() => {
    
    scene.background = nightMode
      ? new THREE.Color('#ffff') 
      : new THREE.Color('#b1e1ff'); 
  }, [nightMode, scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const radius = 20;

    
    if (!nightMode) {
      sun.current.position.set(
        Math.sin(t * 0.1) * radius,
        Math.cos(t * 0.1) * radius,
        10
      );
      sun.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={nightMode ? 0.2 : 1} />

      {/* Sun / Moon */}
      <directionalLight
        ref={sun}
        castShadow
        position={[10, 15, 5]}
        intensity={nightMode ? 0.05 : 0.5}
        color={nightMode ? '#8888ff' : '#ffddaa'}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {/* Hemisphere Light */}
      <hemisphereLight
        skyColor={nightMode ? '#0a0a1a' : '#b1e1ff'}
        groundColor={nightMode ? '#111' : '#ffe4b5'}
        intensity={nightMode ? 0.1 : 2}
      />

     
      <spotLight
        position={[-10, 5, -10]}
        angle={0.3}
        penumbra={0.5}
        intensity={nightMode ? 2 : 1}
        color={nightMode ? '#88aaff' : '#ffd6aa'}
        castShadow
      />


      <pointLight position={[1, 1.2, 0]} intensity={nightMode ? 1.2 : 0.8} color="#ff33cc" />
      <pointLight position={[-1, 1.2, 0]} intensity={nightMode ? 1.2 : 0.8} color="#33ccff" />
    </>
  );
};

export default Lights;

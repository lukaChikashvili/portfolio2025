import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react';

const Lights = () => {
  const sun = useRef();
  const { scene } = useThree();




  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.2} color="#4455ff" />

      
    

      <spotLight
  position={[5, 60, 5]}   
  target-position={[0, 5, 0]} 
  angle={0.4}             
  penumbra={2}          
  intensity={10}           
  color={'blue'}      
  castShadow
  shadow-mapSize-width={2048}
  shadow-mapSize-height={2048}
  shadow-bias={-0.0001}  
  distance={20}          
  decay={2}              
/>

<spotLight
      
        position={[-15, 30, -10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ff66cc"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        distance={20}
        decay={2}
        target-position={[0, 0, 0]}
      />

<pointLight  position={[5, 5, 5]} intensity={1.5} color="#33ccff" distance={15} decay={2} />
      <pointLight position={[-5, 5, -5]} intensity={1.5} color="#ff33aa" distance={15} decay={2} />
      
    </>
  );
};

export default Lights;

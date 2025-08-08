import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'

const Lights = () => {

    const sun = useRef()

    useFrame((state) => {
      const t = state.clock.getElapsedTime();
      const radius = 20;
      sun.current.position.set(
        Math.sin(t * 0.1) * radius,
        Math.cos(t * 0.1) * radius,
        10
      );
  
      sun.current.lookAt(0, 0, 0);
    })


  return (
     <>
      <ambientLight intensity={1} />
      <directionalLight
  ref={sun}
  castShadow
  position={[10, 15, 5]}
  intensity={2}
  color="#ffddaa"
  shadow-mapSize-width={4096}
  shadow-mapSize-height={4096}
  shadow-camera-far={100}
  shadow-camera-left={-30}
  shadow-camera-right={30}
  shadow-camera-top={30}
  shadow-camera-bottom={-30}
/>

<hemisphereLight skyColor={"#b1e1ff"} groundColor={"#ffe4b5"} intensity={2} />

<spotLight
  position={[-10, 5, -10]}
  angle={0.3}
  penumbra={0.5}
  intensity={1}
  color="#ffd6aa"
  castShadow
/>

<pointLight position={[1, 1.2, 0]} intensity={0.8} color="#ffbb88" />
<pointLight position={[-1, 1.2, 0]} intensity={0.8} color="#88ccff" />
     </>
  )
}

export default Lights

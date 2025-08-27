import { useGLTF, useTexture } from '@react-three/drei'
import React, { forwardRef, useContext } from 'react'
import { goBack } from './GoBack';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap'
import { UserContext } from '@/context/UserContext';

const Train = forwardRef((props, ref) => {
  const train = useGLTF('./train.glb');
  const back = useTexture('./back.png');

  const { camera } = useThree();

  const { setBackArrow } = useContext(UserContext);


  const cameraBack = () => {
    goBack(camera);

    gsap.to(ref.current.position, {
      x: 70
    });

    setBackArrow(true);


  }

  return (
    <group position={[70, 8, 0]} ref={ref} {...props}>
     
      <mesh position={[-27, -1.5, 5.5]} onClick={cameraBack}> 
        <planeGeometry args={[45, 2, 500, 500]} />
        <meshBasicMaterial map={back} />
      </mesh>

     
      <primitive object={train.scene} scale={3} rotation={[0, 1.6, 0]} />
    </group>
  )
})

export default Train;
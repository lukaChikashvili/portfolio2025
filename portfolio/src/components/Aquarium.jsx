import { waterFragment } from '@/shaders/aqarium/fragment'
import { waterVertex } from '@/shaders/aqarium/vertex'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { goBack } from './GoBack'

const getWaveElevation = (x, z, time, frequency, elevation) => {
    return (
      Math.sin(x * frequency.x + time) *
      Math.sin(z * frequency.y + time) *
      elevation
    );
  };

  const getWaveNormal = (x, z, time, frequency, elevation) => {
    const dx =
      frequency.x *
      elevation *
      Math.cos(x * frequency.x + time) *
      Math.sin(z * frequency.y + time);
    const dz =
      frequency.y *
      elevation *
      Math.sin(x * frequency.x + time) *
      Math.cos(z * frequency.y + time);
 
    return new THREE.Vector3(-dx, 1, -dz).normalize();
  };

const Aquarium = () => {

    const { camera } = useThree();

    // paper boat
    const boat = useGLTF('./boat.glb');
    const boatRef = useRef();

    const frequency = new THREE.Vector2(2.75, 1.1);
    const elevation = 0.2;

    const timeRef = useRef(0);

    useFrame((state, delta) => {
        timeRef.current += delta;
    
        if (boatRef.current) {
          const pos = boatRef.current.position;
    
          
          const y = getWaveElevation(
            pos.x,
            pos.z,
            timeRef.current,
            frequency,
            elevation
          );
    
         
          boatRef.current.position.y = 12.2 + y; 
    
        
          const normal = getWaveNormal(
            pos.x,
            pos.z,
            timeRef.current,
            frequency,
            elevation
          );
    
          
          const up = new THREE.Vector3(0, 1, 0);
          const quat = new THREE.Quaternion().setFromUnitVectors(up, normal);
          boatRef.current.quaternion.slerp(quat, 0.1); 
        }
      });
    

   
    const debugObject = {};

    debugObject.depthColor = '#0a2a4d';
    debugObject.surfaceColor = '#1ca3ec';

    const uniforms = useRef({
        uTime: {value: 0},
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(2.75, 1.1) },
        uDepthColor: { value: new THREE.Color(debugObject.depthColor)},
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor)},
        uColorOffset: { value: 0.12},
        uColorMultiplier: { value: 5}
      });
    
      useFrame(() => {
         uniforms.current.uTime.value += 0.0025;
      })
    

  return (
    <>
      <mesh position={[-5, 12.4, 5]}>
      <boxGeometry args={[4, 2, 3]} />
      <meshPhysicalMaterial
        color="#a0c8f0"
        transmission={0.9}      
        thickness={0.1}        
        roughness={0}         
        metalness={0}           
        clearcoat={1}          
        clearcoatRoughness={0}  
        side={THREE.DoubleSide} 
        transparent
        opacity={0.8}
      />
    </mesh>

    <mesh position={[-5, 12.2, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 2.9, 800, 800]} />
        <shaderMaterial vertexShader={waterVertex}
         fragmentShader={waterFragment} uniforms={uniforms.current} />
      </mesh>

      <primitive onClick = {() => goBack(camera)} ref = {boatRef} object={boat.scene} scale = {0.05} position={[-5, 12.4, 5]} />
    </>
  )
}

export default Aquarium

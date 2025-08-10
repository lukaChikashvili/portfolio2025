import { useGLTF, useTexture } from '@react-three/drei'
import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { goBack } from './GoBack'


const House = () => {


   
    // wall texture
    const wallTexture = useTexture('./wall.webp');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(0.25, 0.25);

  const floorTexture = useTexture('./floor.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(20, 20);

  const homeTexture = useTexture('./home.png');


  const title = useGLTF('./title.glb');
  const tv = useGLTF('./tv.glb');
  const clock = useGLTF('./clock.glb');

  const { camera } = useThree();
  
  


  // back to home camera animation
  const handleGoBack = () => {
    goBack(camera);

  }


  const videoRef = useRef(null);
  const videoTextureRef = useRef(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/tamada.mp4';
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;

    videoRef.current = video;

    video.playsInline = true; 
    
    const videoPromise = new Promise((resolve) => {
      video.oncanplay = () => {
        video.play().then(() => {
          resolve(video);
        }).catch(error => {
          console.error('Video play failed:', error);
          resolve(video);
        });
      };
    });
  
    videoPromise.then((readyVideo) => {
        const videoTexture = new THREE.VideoTexture(readyVideo);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
      
       
        tv.scene.traverse((child) => {
          if (child.isMesh && child.name === "TV_49Zoll_Screen1_0") {
           
            child.geometry.computeBoundingBox();
            const bbox = child.geometry.boundingBox;
            const screenWidth = bbox.max.x - bbox.min.x;
            const screenHeight = bbox.max.y - bbox.min.y;
      
            const screenAspect = screenWidth / screenHeight;
            const videoAspect = readyVideo.videoWidth / readyVideo.videoHeight;
      
          
            if (videoAspect > screenAspect) {
              
              const scaleX = screenAspect / videoAspect;
              videoTexture.repeat.set(scaleX, 1);
              videoTexture.offset.set((1 - scaleX) / 2, 0);
            } else {
              
              const scaleY = videoAspect / screenAspect;
              videoTexture.repeat.set(1, scaleY);
              videoTexture.offset.set(0, (1 - scaleY) / 2);
            }
      
            child.material = new THREE.MeshBasicMaterial({
              map: videoTexture,
              toneMapped: false,
            });
            child.material.needsUpdate = true;
          }
        });
      });
      
  
  
   
    
   
  }, [tv]);
    



  const shape = useMemo(() => {
  
    const wall = new THREE.Shape()
    wall.moveTo(-40, -40) 
    wall.lineTo(40, -40)  
    wall.lineTo(40, 40)   
    wall.lineTo(-40, 40)  
    wall.lineTo(-40, -40) 

   
    const hole = new THREE.Path()
    const holeSize = 7
    const halfHole = holeSize / 2

    
    hole.moveTo(-halfHole, -halfHole)
    hole.lineTo(halfHole, -halfHole)
    hole.lineTo(halfHole, halfHole)
    hole.lineTo(-halfHole, halfHole)
    hole.lineTo(-halfHole, -halfHole)

    wall.holes.push(hole)

    return wall
  }, [])

  return (
    <>
    <RigidBody type='fixed'>
    <mesh position={[0, 18, 40]}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial  map = {wallTexture} side={THREE.DoubleSide} />
    </mesh>
    </RigidBody>

<RigidBody type='fixed'>
<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,10, 190]}>
<planeGeometry args={[400, 300]} />
<meshStandardMaterial map = {floorTexture} side={THREE.DoubleSide} />

</mesh>
</RigidBody>

<primitive object={title.scene} scale = {0.15} rotation = {[0, -0.2, 0]} position = {[15, 11, 40]} />
<primitive object={tv.scene} scale = {6} position = {[-6, 23, 40.5]} />
<primitive object={clock.scene} rotation = {[0, -1.1, 0]} scale = {6} position = {[-8, 20, 40.5]} />

{/*  Go Back button */}

<mesh position = {[0, 12, 40.2]} onClick={handleGoBack}>
    <planeGeometry args = {[7, 2]} />
    <meshBasicMaterial map = {homeTexture} />
</mesh>


</>
  )
}

export default House
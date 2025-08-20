import React, { forwardRef, useContext, useRef } from 'react'
import { useTexture } from '@react-three/drei'
import gsap from 'gsap'
import { UserContext } from '@/context/UserContext';
import { ProjectList } from './ProjectList';

const InfoBoard = forwardRef(({ textureUrl, position = [0, 0, 0] , onClick }, ref, ) => {
  const texture = useTexture(textureUrl);

  const githubTexture = useTexture('./github.png');
  const liveTexture = useTexture('./live.png');

  const githubRef = useRef();
  const liveRef = useRef();

  const { selectedProject, setSelectedProject } = useContext(UserContext);



  const onHover = (ref) => {
   
        gsap.to(ref.current.rotation, {
            x: 1,
            duration: 1,
            ease: "back.out"
        })
    }
   
  
  
  const hoverOut = (ref) => {
    
        gsap.to(ref.current.rotation, {
            x: 0,
            duration: 1,
            ease: "back.out"
        })
  
    
    
  }
  const showGithub = () => {
    if (selectedProject) {
      const project = ProjectList.find(
        (p) => p.title === selectedProject.title
      );
      if (project?.github) {
        window.open(project.github, "_blank");
      }
    }
  };

  const showLive = () => {
    if (selectedProject) {
      const project = ProjectList.find(
        (p) => p.title === selectedProject.title
      );
      if (project?.live) {
        window.open(project.live, "_blank");
      }
    }
  }

  return (
    <group ref={ref} position={position} onClick={onClick}>
   

      
      <mesh position={[0, 2, 0.05]}>
        <planeGeometry args={[10, 2]} /> 
        <meshBasicMaterial map={texture} transparent />
      </mesh>

      <mesh ref = {githubRef} position={[-2.5, 0, 0.05]} onClick={showGithub}
      onPointerEnter={() => onHover(githubRef)} onPointerLeave={() => hoverOut(githubRef)}>
        <boxGeometry args={[5, 2, 1]} /> 
        <meshBasicMaterial map={githubTexture} transparent />
      </mesh>

      <mesh ref = {liveRef} position={[2.5, 0, 0.05]} onClick={showLive} onPointerEnter={() => onHover(liveRef)} 
      onPointerLeave={() => hoverOut(liveRef)}>
        <boxGeometry args={[5, 2, 1]} /> 
        <meshBasicMaterial map={liveTexture} transparent />
      </mesh>


    </group>
  )
})

export default InfoBoard

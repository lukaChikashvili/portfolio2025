
import React, { useRef } from 'react'
import Flag from './Flag';
import gsap from 'gsap'
import { useThree } from '@react-three/fiber';

 const Menu = () => {
     
    const { camera } = useThree();


    // show projects camera movement
    const showProjects = () => {
         gsap.to(camera.position, {
            x: 0.57,
      y: 19.6,
      z: 52,
      duration: 2,
      ease: 'power2.inOut',
      
    });


    
    }

    // show about camera movement
   const showAbout = () => {
    gsap.to(camera.position, {
    x: -5, 
  z:5.5,
  y: 13,
  duration: 2,
  ease: 'power2.inOut',
  
});

   }


  return (
   <>
        <Flag
        texturePath='./projects.png'
        position={[-20, 10, 0]}
        rotation={[-0.2, -0.7, 0]}
        onclick={showProjects}
      />

     <Flag
        texturePath='./about.png'
        position={[10, 10, 20]}
        rotation={[0, -0.9, 0]}
        onclick={showAbout}
      />

       <Flag
        texturePath='./skills.png'
        position={[30, 10, 0]}
        rotation={[0, -0.6, 0]}
      />

<Flag
        texturePath='./contact.png'
        position={[-12, 10, -10]}
        rotation={[0, -0.6, 0]}
      />
   </>
  )
}

export default Menu

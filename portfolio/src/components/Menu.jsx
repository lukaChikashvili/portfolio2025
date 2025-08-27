
import React, { useRef, useState } from 'react'
import Flag from './Flag';
import gsap from 'gsap'
import { useThree } from '@react-three/fiber';

const Menu = ({ chainRefs }) => {
     
    const { camera } = useThree();

  


    const fixedRotation = camera.rotation.clone();


    // show projects camera movement
    const showContact = () => {
         gsap.to(camera.position, {
            x: 0.57,
      y: 19.6,
      z: 52,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.rotation.copy(fixedRotation);
      }
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


   // show skills camera movement
   const showSkills = () => {
    gsap.to(camera.position, {
  
    y: -15,
    duration: 2,
    ease: 'power2.inOut',
    
  });

  
   }

    // show projects camera movement
     
    const showProjects = () => {
      gsap.to(camera.position, {
         x: 18,
         y: 15,
         z: -45,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.rotation.copy(fixedRotation);
      },

      onComplete: () => {
        
        chainRefs.current.forEach(ref => {
            gsap.to(ref.position, {
              y: 12,
              duration: 1.2,
              ease: 'power2.inOut',
              
              stagger: {
                from: "start",
                amount: 1,
                ease: 'power2.inOut',
              }

            }) 
        });

        
      }
    });


 



    
    }



  return (
   <>
        <Flag
        texturePath='./projects.png'
        position={[-20, 10, 0]}
        rotation={[-0.2, -0.7, 0]}
        onclick = {showProjects} 
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
        onclick={showSkills}
      />

<Flag
        texturePath='./contact.png'
        position={[-12, 10, -10]}
        rotation={[0, -0.6, 0]}
        onclick={showContact}
      />


   </>
  )
}

export default Menu

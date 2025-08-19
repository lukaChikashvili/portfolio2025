import { useGLTF, useTexture } from '@react-three/drei'
import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { goBack } from './GoBack';
import { useFrame, useThree } from '@react-three/fiber';
import { clothVertex } from '@/shaders/cloth/vertex';
import { clothFragment } from '@/shaders/cloth/fragment';
import * as THREE from 'three'
import gsap from 'gsap'
import ProjectName from './ProjectName';
import InfoBoard from './InfoBoard';
import Description from './Description';

const ChainGroup = forwardRef(({ position, imageUrl, onClick }, ref) => {
  
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
    <group ref={ref} position={position} onClick={onClick}   >
      <primitive
        object={chain.scene.clone()}
        scale={0.3}
        position={[0, 0, -0.6]}
      />
      <mesh rotation={[0, -0.4, 0]} >
        <planeGeometry args={[10, 5, 500, 500]} />
        <shaderMaterial
          vertexShader={clothVertex}
          fragmentShader={clothFragment}
          uniforms={uniforms.current}
        />
      </mesh>
    </group>
  );
});

const Projects = ({chainRefs, descRef, onShowOverlay}) => {
  const { camera } = useThree();

  const boardRef = useRef();



  const [currentIndex, setCurrentIndex] = useState(0);
  const [textureOpacity, setTextureOpacity] = useState(1);

  const [selectedProject, setSelectedProject] = useState(null); 

  const nextBtn = useRef();
  const prevBtn = useRef();

  

  const changeTexture = (newIndex) => {
    
    gsap.to({ opacity: textureOpacity }, {
      opacity: 0,
      duration: 0.3,
      onUpdate: function() {
        setTextureOpacity(this.targets()[0].opacity);
      },
      onComplete: () => {
       
        setCurrentIndex(newIndex);
  
        
        gsap.to({ opacity: 0 }, {
          opacity: 1,
          duration: 0.3,
          onUpdate: function() {
            setTextureOpacity(this.targets()[0].opacity);
          }
        });
      }
    });
  };

  const projectImages = [
    "./tamada.png",
    "./vote.png",
    "./girl.png",
    "./neo.png",
    "./mix.png",
    "./blog.png",
    "./flow.png",
    "./baia.png",
    "./cigar.png",
    "./funeral.png",
    "./planet.png",
    "./vanga.png",

  ];

  const projectNames = [
    "./tamadaTitle.png",
    "./fakeTitle.png",
    "./girlTitle.png",
    "./neoTitle.png",
    "./mixTitle.png",
    "./blogTitle.png",
    "./flowTitle.png",
    "./baiaTitle.png",
     "./cigarTitle.png",
     "./paradiseTitle.png",
     "./planetTitle.png",
     "./vangaTitle.png"
  ];



  const [images, setImages] = useState(projectImages);



  const projectRef = useRef();

  // audio
  const woodSound = new Audio('./wood.mp3');
  const curtain = new Audio('./curtain.mp3');
  const click = new Audio('./click.mp3');



  const initialPositions = [
    [20, 52, -55],
    [40, 52, -55],
    [60, 52, -55],
    [80, 52, -55],
    [100, 52, -55],
    [120, 52, -55],
    [140, 52, -55],
    [160, 52, -55],
    [180, 52, -55],
    [200, 52, -55],
    [220, 52, -55],
    [240, 52, -55]
  ];

  // board animations
  const signBoardAnimation = () => {
    if (!projectRef.current) return;
  
    const originalRotation = projectRef.current.rotation.y;
  
    gsap.to(projectRef.current.rotation, {
      y: originalRotation + 6.5, 
      duration: 0.5,
      ease: "circ.inOut",
      yoyo: true,
      repeat: 1 
    });


   
    
  };


  const signBoardAnimationDown = () => {
    if (!projectRef.current) return;
  
  
    gsap.to(projectRef.current.position, {
      y: projectRef.current.position.y - 10, 
      duration: 0.5,
      ease: "power3.inOut",
    
    });

  

  }

  const signBoardAnimationUp = () => {
    if (!projectRef.current) return;
  
  
    gsap.to(projectRef.current.position, {
      y: projectRef.current.position.y + 10, 
      duration: 0.5,
      ease: "power3.inOut",
    
    });

  

  }

  const signBoardAnimationBack = () => {
    if (!projectRef.current) return;
  
    const originalRotation = projectRef.current.rotation.y;
  
    gsap.to(projectRef.current.rotation, {
      y: originalRotation - 6.5, 
      duration: 0.5,
      ease: "circ.inOut",
      yoyo: true,
      repeat: 1 
    });
  }

  // description animation
  const descAnimation = () => {
   
    gsap.to(descRef.current.position, {
       y: 6,
       duration: 1,
       ease: "power1.inOut"
    })
  }

  const descAnimationBack = () => {
    gsap.to(descRef.current.position, {
      y: 40,
      duration: 1,
      ease: "power1.inOut"
   })
  }


  const buttonEffect = (btnRef) => {
    if (btnRef && btnRef.current) {
      gsap.to(btnRef.current.position, {
        y: btnRef.current.position.y - 0.5,
        duration: 0.15,
        ease: "power1.in",
        onComplete: () => {
          gsap.to(btnRef.current.position, {
            y: btnRef.current.position.y + 0.5,
            duration: 0.25,
            ease: "bounce.out"
          });
        }
      });
    }
  };



  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % projectNames.length;
  
    if (selectedProject !== null) {
      
      hideInfo(selectedProject.index, () => {
        gsap.delayedCall(0.3, () => { 
          moveChains(-20); 
          changeTexture(nextIndex);
          buttonEffect(prevBtn);
          signBoardAnimation();
          woodSound.play();
          curtain.play();
          click.play();
        });
      });
    } else {
      moveChains(-20);
      changeTexture(nextIndex);
      buttonEffect(prevBtn);
      signBoardAnimation();
      woodSound.play();
      curtain.play();
      click.play();
    }
  };

  const moveChains = (xOffset) => {
    chainRefs.current.forEach((ref) => {
      if (ref && ref.position) {
        gsap.to(ref.position, {
          x: ref.position.x + xOffset,
          duration: 1,
          ease: "power2.inOut",
        });
      }
    });
  };


  const handlePrev = () => {
    const nextIndex = (currentIndex - 1 + projectNames.length) % projectNames.length;
  
    if (selectedProject !== null) {
      hideInfo(selectedProject.index, () => {
        gsap.delayedCall(0.3, () => {
          moveChains(20); 
          changeTexture(nextIndex);
          buttonEffect(nextBtn);
          signBoardAnimationBack();
          woodSound.play();
          curtain.play();
          click.play();
        });
      });
    } else {
      moveChains(20); 
      changeTexture(nextIndex);
      buttonEffect(nextBtn);
      signBoardAnimationBack();
      woodSound.play();
      curtain.play();
      click.play();
    }
  };
const rightArrow = useTexture('./arrowRight.png');
const leftArrow = useTexture('./arrowLeft.png');




 // show project info
 const showInfo = (index) => {
  const chain = chainRefs.current[index];
  if (!chain) return;

  const chainPos = chain.position.clone();


  gsap.to(chain.position, {
    y: chain.position.y + 20,
    duration: 1,
    ease: "power2.inOut",
    onComplete: () => {
      setSelectedProject({
        index,
        position: chainPos
      });
      signBoardAnimationDown();
      descAnimation();

      if (boardRef.current) {
        
        boardRef.current.position.y = chain.position.y + 20; 
        gsap.to(boardRef.current.position, {
          y: chain.position.y,  
          duration: 2,
          ease: "power2.out"
        });
      }
     
 
    }

   
   
  });



};

// hide info board


const hideInfo = (index, onHidden) => {
  const chain = chainRefs.current[index];
  if (!chain) return;

  gsap.to(chain.position, {
    y: chain.position.y - 20,
    duration: 1,
    ease: "power2.inOut"
  });

  if (boardRef.current) {
    gsap.to(boardRef.current.position, {
      y: chain.position.y - 10,
      duration: 1,
      ease: "power2.in",
      onComplete: () => {
        signBoardAnimationUp();
        descAnimationBack();
        setSelectedProject(null);
        if (onHidden) onHidden();
      }
    });
  } else {
    if (onHidden) onHidden();
  }
}




  return (
    <>

{selectedProject !== null && (
  <InfoBoard
    ref={boardRef}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault?.();
      hideInfo(selectedProject.index);
    }}
    textureUrl={projectNames[selectedProject.index]}
    position={[selectedProject.position.x, selectedProject.position.y, selectedProject.position.z]}
  />
)}


      {projectImages.map((img, i) => (
        <ChainGroup
          key={i}
          ref={(el) => (chainRefs.current[i] = el)}
          position={initialPositions[i]}
          imageUrl={img}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            e.preventDefault?.();
            showInfo(i);
          }}
        />
      ))}

      {/* Go back button */}
      <mesh position={[10, 11, -64]} onClick={() => goBack(camera)}>
        <planeGeometry args={[7, 2]} />
        <meshStandardMaterial map={useTexture('./project.png')} />
      </mesh>

      {/* Next button */}

      <mesh ref = {nextBtn} position={[24, 7, -48]} onClick={handlePrev}>
        <boxGeometry args={[3, 1]} />
        <meshBasicMaterial map = {leftArrow} />
      </mesh>

        {/* prev button */}
        <mesh ref = {prevBtn} position={[28, 7, -48]} onClick={handleNext}>
        <boxGeometry args={[3, 1]} />
        <meshBasicMaterial map = {rightArrow} />
      </mesh>

      <ProjectName projectNameRef={projectRef} textureUrl={projectNames[currentIndex]} />

      <Description ref = {descRef} onShowOverlay={onShowOverlay}  />
    </>
  );
};

export default Projects;
import { useGLTF, useTexture } from '@react-three/drei'
import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { goBack } from './GoBack';
import { useFrame, useThree } from '@react-three/fiber';
import { clothVertex } from '@/shaders/cloth/vertex';
import { clothFragment } from '@/shaders/cloth/fragment';
import * as THREE from 'three'
import gsap from 'gsap'
import ProjectName from './ProjectName';

const ChainGroup = forwardRef(({ position, imageUrl }, ref) => {
  
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
    <group ref={ref} position={position}   >
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

const Projects = ({chainRefs}) => {
  const { camera } = useThree();


  const [currentIndex, setCurrentIndex] = useState(0);
  const [textureOpacity, setTextureOpacity] = useState(1);

  const nextBtn = useRef();
  const prevBtn = useRef();

  const changeTexture = (newIndex) => {
   
    gsap.to({ opacity: 1 }, {
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
    "./tamadaTitle.png",
    "./tamadaTitle.png",
    "./tamadaTitle.png",
     "./tamadaTitle.png",
  ];



  const [images, setImages] = useState(projectImages);

 


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
    changeTexture(nextIndex);


     chainRefs.current.forEach((ref) => {
      if (ref && ref.position) {
        gsap.to(ref.position, {
          x: ref.position.x - 20,
          duration: 1,
          ease: "power2.inOut",
        });
      }
    });

    buttonEffect(prevBtn);

    
  
  };


  const handlePrev = () => {

    const nextIndex = (currentIndex - 1) % projectNames.length;
    changeTexture(nextIndex);
    
    chainRefs.current.forEach((ref) => {
      if (ref) {
        gsap.to(ref.position, {
          x: ref.position.x + 20, 
          duration: 1,
          ease: "power2.inOut"
        });
      }
    });

    buttonEffect(nextBtn);
  }

  return (
    <>
      {images.map((img, i) => (
        <ChainGroup
          key={i}
          ref={(el) => (chainRefs.current[i] = el)}
          position={initialPositions[i]}
          imageUrl={img}
        />
      ))}

      {/* Go back button */}
      <mesh position={[10, 11, -64]} onClick={() => goBack(camera)}>
        <planeGeometry args={[7, 2]} />
        <meshStandardMaterial map={useTexture('./project.png')} />
      </mesh>

      {/* Next button */}
      <mesh ref = {nextBtn} position={[24, 7, -49]} onClick={handlePrev}>
        <boxGeometry args={[3, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

        {/* prev button */}
        <mesh ref = {prevBtn} position={[28, 7, -49]} onClick={handleNext}>
        <boxGeometry args={[3, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <ProjectName textureUrl={projectNames[currentIndex]} />
    </>
  );
};

export default Projects;

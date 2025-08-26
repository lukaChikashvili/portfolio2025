"use client";
import Experience from "@/components/Experience";
import Lights from "@/components/Lights";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Moon, Sun } from "lucide-react";
import { useRef, useState, forwardRef, useImperativeHandle, useEffect, useContext } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ProjectDescription from "@/components/ProjectDescription";
import { UserContext } from "@/context/UserContext";


const CameraController = forwardRef((props, ref) => {
  const { camera } = useThree();

  useImperativeHandle(ref, () => ({
    resetCamera: () => {
      gsap.to(camera.position, {
        x: 18,
        y: 15,
        z: -45,
        duration: 1.5,
        ease: "power2.inOut",
      });
    },
    moveTo: (x, y, z, duration = 1.5) => {
      gsap.to(camera.position, { x, y, z, duration, ease: "power2.inOut" });
    },
    getCamera: () => camera,
  }));

  return null;
});

CameraController.displayName = "CameraController"; 



export default function Home() {
  const [isNight, setIsNight] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const descRef = useRef();
  const cameraRef = useRef();

  const { selectedProject, setSelectedProject } = useContext(UserContext);

  const toggleDayNight = () => setIsNight(!isNight);

  const closeOverlay = () => {
    setShowOverlay(false);
    cameraRef.current?.resetCamera();
  };

  useEffect(() => {
    gsap.to('.glass', {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      delay: 0.7
    });

    if(!showOverlay) {
      gsap.to('.glass', {
        opacity: 0,
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.7
      });
    }
  }, [showOverlay]);

  

  return (
    <>
      <Canvas
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
        camera={{ position: [-13, 15, 25], fov: 70, near: 0.1, far: 10000 }}
        shadows
        gl={{ physicallyCorrectLights: true }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color(isNight ? 0x0a0a2a : 0xcce0ff);
          scene.fog = new THREE.FogExp2(isNight ? 0x0a0a2a : 0xcce0ff, isNight ? 0.002 : 0.001);
        }}
      >
        <Physics>
          <Lights isNight={isNight} />
          <Experience
            isNight={isNight}
            descRef={descRef}
            onShowOverlay={() => setShowOverlay(true)}
            cameraRef={cameraRef}
            selectedProject = {selectedProject}
            setSelectedProject = {setSelectedProject}
          />
          <CameraController ref={cameraRef} />
        </Physics>
      </Canvas>

      
      <div className="absolute top-5 left-5 z-10">
        <button className="px-4 py-2 text-white rounded text-xl" onClick={toggleDayNight}>
          {isNight ? <Sun /> : <Moon />}
        </button>
      </div>

  
      {showOverlay && (
        <div className="opacity-0 absolute top-5 left-5 z-10 glass w-[90%] h-[90%] mt-8 ml-16 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white bg-black/40 px-3 py-1 rounded"
            onClick={closeOverlay}
          >
            ✕
          </button>

          <ProjectDescription stack = {selectedProject?.stack} number = {selectedProject?.number} title={selectedProject?.title} description={selectedProject?.description} />
        </div>
      )}
    </>
  );
}

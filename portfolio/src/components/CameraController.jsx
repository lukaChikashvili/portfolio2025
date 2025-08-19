
function CameraController({ descRef }) {
    const { camera } = useThree();
  
    const closeDesc = () => {
      gsap.to(camera.position, {
        x: 18,
        y: 15,
        z: -45,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    };
  
    
    return null;
  }
import gsap from 'gsap'

export const goBack = (camera) => {
    gsap.to(camera.position, {
      x: -13,
      y: 14,
      z: 25,
      duration: 2,
      ease: 'power2.inOut',
    });
  };
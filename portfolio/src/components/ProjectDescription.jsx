import React, { useRef } from 'react'
import SplitType from 'split-type';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'


gsap.registerPlugin(SplitText);
gsap.registerPlugin(useGSAP);


const ProjectDescription = ({ title, description, number, stack }) => {

    const container = useRef();

    useGSAP(() => {
        const heroText = new SplitType(".home h1", {types: "chars"});
    
        gsap.set(heroText.chars, {y: 400});
    
        gsap.to(heroText.chars, {
          y: 0,
          duration: 1,
          stagger: 0.075,
          ease: "power4.out",
          delay: 1
        });
    
    
        const taglineSplit = new SplitType(".tagline", { types: "words" });
      gsap.set(taglineSplit.words, { y: 50, opacity: 0 });
      gsap.to(taglineSplit.words, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: {
           amount: 0.1,
           from: "start",
    
           
        },
        ease: "power3.out",
        delay: 2.2,
      });


      gsap.to('.desc', {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.inOut"
      });
    
    
      const descSplit = new SplitType(".desc", { types: "words" });
      gsap.set(descSplit.words, { y: 50, opacity: 0 });
      gsap.to(descSplit.words, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
        delay: 1.5,
      });

      
      gsap.fromTo(
        ".stack-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 2.5 }
      );
 
    
      }, {scope: container});


  return (
    <div>
       <div className="home text-slate-600 p-6 " ref = {container}>
        <div className='flex '>
        <h1 className="text-8xl font-bold mb-4">{title}</h1>
        <p className='text-3xl'>{number}</p>
        </div>
     
    <p className='text-3xl w-2/3 desc opacity-0'>{description}</p>

<div className='flex gap-4'>
      {stack.map((value) => (
        <div key={value.id} >
          <p className='text-3xl text-slate-600 font-bold mt-4 bg-white p-2 rounded-md shadow-lg cursor-pointer duration-500 ease hover:-mt-[0.5px] hover:bg-slate-200'>{value.title}</p>
            </div>
      ))}
      </div>
    </div>
    </div>
  )
}

export default ProjectDescription

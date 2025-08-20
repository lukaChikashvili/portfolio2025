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
    
    
 
    
      }, {scope: container});


  return (
    <div>
       <div className="home text-slate-600 p-6 " ref = {container}>
        <div className='flex'>
        <h1 className="text-8xl font-bold mb-4">{title}</h1>
        <p className='text-3xl'>{number}</p>
        </div>
     
    <p className='text-3xl w-2/3'>{description}</p>

<div className='flex gap-4'>
      {stack.map((value) => (
        <div key={value.id} >
          <p className='text-3xl text-slate-600 font-bold mt-4'>{value.title}</p>
            </div>
      ))}
      </div>
    </div>
    </div>
  )
}

export default ProjectDescription

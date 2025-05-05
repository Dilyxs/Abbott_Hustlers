import React from 'react'
import Button from '../components/Button'
import HeroExperience from '../components/HeroModels/HeroExperience'
import {useMediaQuery} from "react-responsive";
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import AnimatedCounter from '../components/AnimatedCounter';


const Words = [{
    text:"Ideas", imgPath:'/images/ideas.svg'
},  {text:"Walls", imgPath:'/images/wall.svg'},
{text:"Windows", imgPath:'/images/window.svg'},
{text:"Gutters", imgPath:'/images/gutter.png'}]



const Hero = () => {
    useGSAP(()=>{
        gsap.fromTo('.hero-text h1', {
            y:50,
            opacity:0,
        }, {
            y:0,
            opacity:1,
            stagger:0.5,
            duration:5,
            ease:'power2.inOut'

        })
    })





const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <section id = 'hero' className='relative overflow-hidden'>
        <div className='absolute top-0 left-0 z-10'>
            <img src="/images/bg.png" alt="background" className='w-full'/>
        </div>

        <div className='hero-layout'>
            <header className='flex flex-col justify-center md:w-full w-screen md:px-20 px-5'>

                <div className='flex flex-col gap-7'>
                <div className='hero-text'>
    
                                    {/* Flex container for Bringing + sliding words */}
                    
                    <div className="flex items-center gap-2 ">
                    <h1>Bringing</h1>

                    <div className="slide flex">
                    <div className="wrapper pl-32 md:pl-62">
                        {Words.map((word, index) => (
                            <span
                            key={index}
                            className="flex items-center md:gap-3 gap-1 pb-2"
                            >
                            <img
                                src={word.imgPath}
                                alt="person"
                                className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                            />
                            <span>{word.text}</span>
                            </span>
                        ))}
                        </div>
                    </div>
                    </div>
                    <h1>to Life</h1>
                    <h1>One Stroke</h1>
                    <h1>At a Time</h1>
                </div>

                <p className='text-white-50 md:text-xl relative z-10 pointer-events-none'>
                    Hi, We're John Abbott Students.
                    Here to serve YOU!
                </p>
                <Button  className="md:w-80 md:h-16 w-60 h-12" id='Button' text="See my Work"></Button>


                </div>

            </header>
            {/*this is the 3D animation stuff*/}
            <figure className={isMobile? "pb-64":""}>
                <div className='hero-3d-layout'>
                    <HeroExperience></HeroExperience>

                </div>
            </figure>

        </div>
        <AnimatedCounter></AnimatedCounter>
    
    </section>
  )
}

export default Hero
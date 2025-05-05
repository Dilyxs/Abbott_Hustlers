import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ShowCase = () => {
  const Project1 = useRef(null);
  const Project2 = useRef(null);
  const Project3 = useRef(null);

  useEffect(() => {
    const cards = [Project1.current, Project2.current, Project3.current];

    cards.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
          },
        }
      );
    });
  }, []);

  return (
    <section id="work" className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* Left side */}
          <div className="first-project-wrapper" ref={Project1}>
            <div className="image-wrapper">
              <img src="/images/deck_painting.jpg" alt="" />
            </div>
            <div className="text-content">
              <h2>Painting Work Done during the Summer With Prestige Quality</h2>
              <p className="text-white-50 md:text-xl">
                Get Painting Projects Done this summer at the lowest possible price!
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={Project2}>
              <div className="image-wrapper">
                <img src="/images/gutter_cleaning.jpeg" alt="" />
              </div>
              <h2>
                Gutter Cleaning done to YOUR house. Expect no blockage for a very long time
              </h2>
            </div>
            <div className="project" ref={Project3}>
              <div className="image-wrapper">
                <img src="/images/window_cleaning.jpg" alt="" />
              </div>
              <h2>Dusty Windows? No more...</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCase;

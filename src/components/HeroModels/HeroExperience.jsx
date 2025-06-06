import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, OrbitControls } from '@react-three/drei';
import { useMediaQuery } from "react-responsive";
import HeroLights from './HeroLights';
import { PainterModel } from './Paiting';

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Canvas camera={{ position: [0, 0, isMobile ? 1000 : 3000], fov: 10 }}>
      <HeroLights />
      
      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        maxDistance={5000}   
        minDistance={100}    
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        dampingFactor={0.25} 
      />

      {/* Suspense for model loading */}
      <Suspense fallback={null}>
        <Bounds fit={false} clip observe margin={2}>
          <PainterModel scale={2  } position={isMobile ? [-100, -600, -200] : [200, -930, -900]} />
        </Bounds>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;

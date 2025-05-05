import React from 'react';

const HeroLights = () => {
  return (
    <>
      {/* Bright ambient light to fill shadows */}
      <ambientLight intensity={1} />

      {/* Multiple directional lights from different angles */}
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-10, 10, 10]} intensity={1} />
      <directionalLight position={[0, -10, 10]} intensity={0.5} />
      <directionalLight position={[0, 10, -10]} intensity={0.5} />

      {/* Optional spotLight for highlight */}
      <spotLight
        position={[15, 20, 5]}
        intensity={2}
        angle={0.3}
        penumbra={0.5}
        castShadow
      />
    </>
  );
};

export default HeroLights;

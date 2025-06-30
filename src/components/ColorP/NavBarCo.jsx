import React from 'react';

const NavBarCo = ({ ...sharedProps }) => {
  console.log(sharedProps)
  function detectColor(name) {
    return sharedProps[name]
      ? "w-4 h-4 rounded-full bg-blue-500 mb-2"
      : "w-4 h-4 rounded-full bg-gray-600 mb-2";
  }

  const steps = [
    { key: "SelectType", label: "Select Photo" },
    { key: "SelectColor", label: "Select Colors" },
    { key: "VisualizeElement", label: "Visualize Environment" },
    { key: "Review", label: "Review" },
  ];

  return (
    <header className="flex flex-col items-center">
      <a
        className="text-white text-2xl font-bold tracking-wide hover:text-blue-400 mt-2 mb-5"
        href="#hero"
      >
        Abbott Hustlers
      </a>
      <nav className="flex flex-row items-center justify-center space-x-6 bg-black py-4 w-full">
        {steps.map(({ key, label }) => (
          <div key={key} className="flex flex-col items-center text-white">
            <div className={detectColor(key)}></div>
            <span className="text-sm text-center">{label}</span>
          </div>
        ))}
      </nav>
    </header>
  );
};

export default NavBarCo;

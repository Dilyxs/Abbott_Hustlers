import React from 'react';
import CountUp from 'react-countup';

const CounterItems = [
  { value: 3, suffix: '+', label: 'Years of Experience' },
  { value: 113, suffix: '+', label: 'Satisfied Clients' },
  { value: 72, suffix: '+', label: 'Completed Projects' },
  { value: 80, suffix: '%', label: 'Sign Rate AFTER Estimate' }
];

const AnimatedCounter = () => {
  return (
    <div id='counter' className='padding-x-lg xl:mt-0 mt-32'>
      <div className='mx-auto grid-4-cols'>
        {CounterItems.map((item, index) => (
          <div
            key={index} // ✅ unique key for each item
            className='bg-zinc-900 rounded-lg p-3 flex flex-col justify-center'
          >
            <div className='counter-name text-white text-5xl font-bold mb-2 pt-2'>
              <CountUp suffix={item.suffix} end={item.value} />
            </div>
            <div className='text-white-50 text-lg'>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;

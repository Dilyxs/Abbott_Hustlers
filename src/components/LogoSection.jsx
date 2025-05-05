import React from 'react'

const logoIconlist = [
    {ImgPath:"/images/logos/painters.png"},{ImgPath:"/images/logos/prestige.png"},{ImgPath:"/images/logos/vitres.png"}
]

const LogoSection = () => {
  return (
    <div className='md:my-20 my-10 relative'>
        <div className='gradient-edge'/>
        <div className='gradient-edge'/>

        <div className='marquee h-52 w-screen '>
            <div className='marquee-box md:gap-12 gap-5'>
                {logoIconlist.map(({ImgPath})=>(
                    <div key={ImgPath} className='flex-none flex-center marquee-item justify-center w-2xl'>
                        <img src={ImgPath} alt="icon" />
                    </div>
                ))}
                {logoIconlist.map(({ImgPath})=>(
                    <div key={ImgPath} className='flex-none flex-center marquee-item justify-center  w-2xl'>
                        <img src={ImgPath} alt="icon" />
                    </div>
                ))}

            </div>
        </div>
      
    </div>
  )
}

export default LogoSection

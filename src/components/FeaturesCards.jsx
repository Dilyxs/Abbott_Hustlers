import React from 'react'

const abilities = [
    {imgPath:'/images/quality.svg',title:'Quality', desc:"Even though we’re students, we take pride in delivering work that rivals the pros. We've spent years refining our technique — from summer jobs to seasonal gigs — so you can trust that every brushstroke reflects experience and care."},
    {imgPath:'/images/price.svg',title:'Price', desc:"As student painters, we understand that budgets matter. That’s why we offer the most affordable rates around — without cutting corners. We keep our costs low so you get professional results at student-friendly prices."},
    {imgPath:'/images/respect.svg',title:'Respect', desc:"We treat your home like it's our own — with respect, cleanliness, and discipline. Whether we’re painting a room or an entire house, we show up on time, work hard, and leave things better than we found them."},
    
]

const FeaturesCards = () => {
  return (

    <div className='w-full padding-x-lg' id='cards_display'>
        <div className='mx-auto grid-3-cols'>
            {abilities.map((ability)=>(
                <div key={ability.title} className='card-border rounded-xl p-8 flex flex-col gap-4'>
                    <div className='size-14 flex items-center justify-center rounded-full ml-12'>
                        <img src={ability.imgPath} alt="title" />
                    <h3 className='text-white text-2xl font-semibold mt-2 ml-12'>
                        {ability.title}
                    </h3>
                    </div>
                    <p className='text-white-50 text-lg'>
                        {ability.desc}
                    </p>
                </div>
            ))}

        </div>

    </div>
  )
}

export default FeaturesCards
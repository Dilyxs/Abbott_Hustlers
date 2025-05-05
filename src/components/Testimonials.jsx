import React from 'react'
import TitleHeader from './TitleHeader'
import GlowCard from './GlowCards'

const LosTestimonials = [
    {
        name:"Sharan",
        Region:" Westminter DDO",
        review:"These guys were ok, they did the job on time and delivered on what they offered, was satisfied. Good kids.",
    },
    {
        name:"Matthew",
        Region:"Fairview DDO",
        review:"They showed up late, but did the gutter job. Showed pictures wouldn't mind taking them again for spring...",

    },
    {
        name:"Todd",
        Region:"Lakeroad Pierrefonds",
        review:" super job sur les gouttières. Rapide, efficace, pis super chill comme équipe. J’les rappellerais n’importe quand.",

    }
]
const Testimonials = () => {
  return (
    <section id='testimonials' className='flex-center flex-col section-padding'>
        <div className='w-full h-full md:px-10 px-5'>
            <TitleHeader title="What people have said about us" sub="💫 Client Feedback Highlight"></TitleHeader>

        </div>

        <div className='lg:columns-3 md:columns-2 columns-1 mt-16'>
            {LosTestimonials.map((testi)=>(
                <GlowCard card={testi}>
                    <div className='flex items-center gap-3'>
                        <div>
                        </div>
                        <div className='font-bold'>
                            <p>{testi.name}</p>
                            <p className='text-white-50'>{testi.Region}</p>
                        </div>
                        
                    </div>
                </GlowCard>

            ))}

        </div>
    </section>
  )
}

export default Testimonials
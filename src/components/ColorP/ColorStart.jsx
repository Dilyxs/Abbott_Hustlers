import React from 'react'
import NavBarCo from './NavBarCo';

const ColorStart = ({...sharedProps}) => {
   return (
    <div >
 
      <NavBarCo {...sharedProps}>  </NavBarCo>

     <main className="max-w-5xl mx-auto p-6">
        <p className="text-xl font-bold text-center mb-8">
          Select A Type Of Painting Project!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg font-semibold">Fence</label>
            <button name='fense'
            onClick={(e)=>{
              console.log(e.currentTarget.name)
            }}>
            <img
              className="w-48 h-32 object-cover rounded-md shadow-md"
              src="/images/Dragon.webp"
              alt="Fence Painting"
              data-name="fense"
            />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg font-semibold">Interior</label>
            <button>
            <img
              className="w-48 h-32 object-cover rounded-md shadow-md"
              src="/images/InteriorPaint.JPG"
              alt="Interior Painting"
                data-name="interior"
            />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg font-semibold">Deck</label>
            <button>
            <img
              className="w-48 h-32 object-cover rounded-md shadow-md"
              src="https://res.cloudinary.com/deovzwlfm/image/upload/v1751211163/OS_Solid_SC-1081_Stonehedge_Deck_qznzsn.jpg"
              alt="Deck Painting"
                data-name="deck"
            />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ColorStart
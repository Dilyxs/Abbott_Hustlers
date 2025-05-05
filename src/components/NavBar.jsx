import React, { useEffect, useState } from 'react'


const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 10;
        setScrolled(isScrolled);
      };
    
      window.addEventListener('scroll', handleScroll);
    
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
       
        {name:"Work", link:"#work"},{name:"Why Us?", link:"#cards_display"},{name:"Testimonials", link:"#testimonials"}
    ]


  return (
    <header className={ `navbar ${scrolled ?`scrolled`:`not-scrolled`}`}>
        <div className='inner'>
            <a className='logo' href='#hero'>
                Abbott Hustlers
            </a>
            <nav className='desktop'>
                <ul>
                    {navLinks.map(({name, link})=>{
                        return (
                            <li key={name} className='group'>
                                <a href={link}>
                                    <span>{name}</span>
                                    <span className='underline'></span>
                                </a>
                            </li>
                        )
                    })}
                </ul>

            </nav>
            <a href="#contact" className='contact-btn group'>
                <div className='inner'>
                    <span>Contact US</span>
                </div>
            </a>

        </div>
    </header>
  )
}

export default NavBar
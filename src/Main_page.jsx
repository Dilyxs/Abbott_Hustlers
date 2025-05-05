import React from 'react';
import Hero from './sections/Hero';
import ShowCase from './sections/ShowCase';
import NavBar from "./components/NavBar"
import LogoSection from './components/LogoSection';
import FeaturesCards from './components/FeaturesCards';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function Main_Page() {

  return (
    <main>
    <NavBar></NavBar>
    <Hero></Hero>
    <ShowCase></ShowCase>
    <LogoSection></LogoSection>
    <FeaturesCards></FeaturesCards>
    <Testimonials></Testimonials>
    <Contact></Contact>
    <Footer></Footer>

    
    </main>

  )
}

export default Main_Page;

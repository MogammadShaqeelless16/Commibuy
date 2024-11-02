// HomePage.js
import React from 'react';
import Menu from '../components/Menu';
import HeroBanner from '../components/HeroBanner';
import Features from '../components/Features';
import AboutMission from '../components/AboutMission';
import Team from '../components/Team';
import AppDownload from '../components/AppDownload';
import ContactSubscribe from '../components/ContactSubscribe';
import Testimonials from '../components/Testimonials';
import Timeline from '../components/Timeline'
import Pricing from '../components/Pricing'


function HomePage() {
  return (
    <div className="home-page">
      <HeroBanner />

      <Features />
      <AboutMission />
      <Timeline />
      <Pricing />
      <Team />
      <AppDownload />

      <Testimonials />
      <ContactSubscribe />
    </div>
  );
}

export default HomePage;

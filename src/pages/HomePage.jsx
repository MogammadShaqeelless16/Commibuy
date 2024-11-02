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

function HomePage() {
  return (
    <div className="home-page">
      <HeroBanner />
      <Features />
      <AboutMission />
      <Team />
      <AppDownload />
      <ContactSubscribe />
      <Testimonials />
    </div>
  );
}

export default HomePage;

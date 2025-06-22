import React from 'react';
import ExperienceHero from '../components/HeroExperienceBanner';
import Testimonial from '../components/Testimonial';
import CallToActionBanner from '../components/CallToActionBanner';
import WhyQuickStay from '../components/WhyQuickStay';
import StatsSection from '../components/StatsSection';

const Experience = () => {
  return (
    <div className="pt-28 ">
      <ExperienceHero />

      <WhyQuickStay />

      <StatsSection />

      <Testimonial />

      <CallToActionBanner />
    </div>
  );
};

export default Experience;

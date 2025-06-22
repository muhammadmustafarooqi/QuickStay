// components/ExperienceHero.jsx
import React from "react";
import assets from "../assets/assets";

const ExperienceHero = () => (
  <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-8 pb-20 px-4 md:px-16 lg:px-24 xl:px-32 bg-white">
    {/* Text Content */}
    <div className="w-full md:w-1/2 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-playfair text-gray-900 leading-tight">
        Experience the Comfort of <br className="hidden md:inline" /> Quick Stay
      </h1>
      <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
        Whether you're planning a vacation or a business trip, Quick Stay ensures 
        a seamless booking experience with trusted listings, modern amenities, and 
        24/7 customer support. Discover comfort and convenience, wherever you go.
      </p>
    </div>

    {/* Image */}
    <div className="w-full md:w-1/2">
      <img
        src={assets.expHeroImg}
        alt="Quick Stay Experience"
        className="w-full h-auto rounded-2xl shadow-xl object-cover"
      />
    </div>
  </section>
);

export default ExperienceHero;

// components/ExperienceHero.jsx
import React from "react";
import assets from "../assets/assets";

const ExperienceHero = () => (
  <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 pt-28 pb-16 px-4 md:px-16 lg:px-24 xl:px-32">
    <div className="max-w-xl">
      <h1 className="text-4xl font-playfair md:text-5xl text-gray-900">
        Experience the Comfort of Quick Stay
      </h1>
      <p className="mt-4 text-gray-600 text-base leading-relaxed">
        Whether you're planning a vacation or a business trip, Quick Stay ensures 
        a seamless booking experience with trusted listings, modern amenities, and 
        customer support that never sleeps.
      </p>
    </div>
    <div className="w-full md:w-[480px]">
      <img
        src={assets.experienceImg}
        alt="Quick Stay Experience"
        className="rounded-xl shadow-lg object-cover"
      />
    </div>
  </section>
);

export default ExperienceHero;

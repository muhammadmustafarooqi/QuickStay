// components/ExperienceStats.jsx
import React from "react";
import { FaHotel, FaUsers, FaCity, FaCheckCircle } from "react-icons/fa";

const stats = [
  {
    icon: <FaHotel size={28} className="text-indigo-600" />,
    title: "1,200+ Hotels",
    desc: "Carefully curated & verified listings.",
  },
  {
    icon: <FaCheckCircle size={28} className="text-indigo-600" />,
    title: "15,000+ Bookings",
    desc: "Secure & confirmed reservations.",
  },
  {
    icon: <FaCity size={28} className="text-indigo-600" />,
    title: "50+ Cities",
    desc: "Wide network across Pakistan.",
  },
  {
    icon: <FaUsers size={28} className="text-indigo-600" />,
    title: "30,000+ Travelers",
    desc: "Trusted by customers nationwide.",
  },
];

const ExperienceStats = () => (
  <section className="bg-gray-50 py-14 px-4 md:px-16 lg:px-24 xl:px-32 mb-10">
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      {stats.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          {item.icon}
          <h3 className="mt-3 font-semibold text-xl">{item.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ExperienceStats;

// components/WhyQuickStay.jsx
import React from "react";
import { FaWifi, FaLock, FaBolt, FaMobileAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaWifi className="text-indigo-600 text-3xl" />,
    title: "Free Wi-Fi",
    desc: "All listings come with high-speed internet for a seamless experience.",
  },
  {
    icon: <FaLock className="text-indigo-600 text-3xl" />,
    title: "Secure Booking",
    desc: "Safe and encrypted transactions with verified listings.",
  },
  {
    icon: <FaBolt className="text-indigo-600 text-3xl" />,
    title: "Instant Confirmations",
    desc: "Get booking confirmation instantly — no waiting.",
  },
  {
    icon: <FaMobileAlt className="text-indigo-600 text-3xl" />,
    title: "Mobile Friendly",
    desc: "Book your stay on the go with our responsive app-like experience.",
  },
];

const WhyQuickStay = () => (
  <section className="bg-gray-50 py-14 px-4 md:px-16 lg:px-24 xl:px-32 mb-10">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-playfair text-gray-900">Why Book with Quick Stay?</h2>
      <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
        We combine technology, trust, and travel convenience to offer the best experience possible.
      </p>
    </div>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {features.map((item, idx) => (
        <div key={idx} className="text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
          <div className="mb-3 flex justify-center">{item.icon}</div>
          <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyQuickStay;

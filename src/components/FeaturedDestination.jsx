import React from "react";
import HotelCard from "./HotelCard";
import { roomsDummyData } from "../assets/assets";
import Titles from "./Titles";
import { useNavigate } from "react-router-dom";

const FeaturedDestination = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Titles
        title="Featured Destination"
        subtitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />
      <div className="flex flex-wrap justify-center items-center gap-6 mt-20">
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard room={room} key={room._id} index={index} />
        ))}
      </div>
      <button
      onClick={() => {navigate("/rooms"); scrollTo(0, 0)}}
      className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer">
        View All Destinations
      </button>
    </div>
  );
};

export default FeaturedDestination;

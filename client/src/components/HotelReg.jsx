import React, { useState } from "react";
import assets, { cities } from "../assets/assets";
import { useAppContext } from "../context/appContext";

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");

  // const onSubmitHandler = async (event) => {
  //   try {
  //     event.preventDefault();
  //     const {data} = await axios.post(
  //       "/hotel/register",

  //   } catch (error) {
      
  //   }
  // }
  return (
    <div onClick={() => setShowHotelReg(false)} 
    className="fixed top-0 left-0 right-0 bottom-0 z-100 flex items-center justify-center  bg-black/70">
      <form 
       onSubmit={onSubmitHandler}
       onClick={(e)=> e.stopPropagation()}
       className="flex bg-white rounded-xl max-w-4xl max-md:mx-2">
        <img
          src={assets.regImage}
          alt="Hotel Registration Image"
          className="w-1/2 rounded-xl hidden md:block"
        />

        <div className="relative flex flex-col items-center p-8 md:p-10 md:w-1/2">
          <img
            onClick={() => setShowHotelReg(false)}
            src={assets.closeIcon}
            alt="Close Icon"
            className="absolute top-4 right-4 w-4 h-4 cursor-pointer"
          />
          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>

          {/* input fields */}
          {/* hotel name */}
          <div className="w-full mt-4">
            <label htmlFor="hotelName" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="name"
              placeholder="Enter your hotel name"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* hotel phone */}
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              onChange={(e) => setContact(e.target.value)}
              value={contact}
              type="text"
              id="contact"
              placeholder="Enter your phone number"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* hotel address */}
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              type="text"
              id="address"
              placeholder="Enter your address"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* select city dropdown */}
          <div className="w-full mt-4">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <select
              onChange={(e) => setCity(e.target.value)}
              value={city}
              id="city"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="" disabled selected>
                Select your city
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          {/* submit button */}

          <button
            type="submit"
            className="bg-indigo-500 text-white rounded px-6 py-2 mt-6 hover:bg-indigo-600 transition-all cursor-pointer font-semibold w-auto"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;

import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import About from "./pages/About";
import Experience from "./pages/Experience";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/HotelOwner/Layout";
import Dashboard from "./pages/HotelOwner/Dashboard";
import AddRoom from "./pages/HotelOwner/AddRoom";
import ListRoom from "./pages/HotelOwner/ListRoom";

function App() {

  const isOwnerPath = useLocation().pathname.includes ("owner")
  return (
    <>
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg /> } 
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/owner" element={<Layout />}>
          <Route  index element={<Dashboard />} />
          <Route  path="add-room" element={<AddRoom />} />
          <Route  path="list-room" element={<ListRoom />} />
          </Route>
          </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

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

function App() {

  const isOwnerPath = useLocation().pathname.includes ("owner")
  return (
    <>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

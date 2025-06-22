import React from "react";
import assets from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const SidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
  ];

  return (
    <div className="md:w-64 w-16 border-r h-[680px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
      {SidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end="/owner"
          className={({ isActive }) =>
            `flex items-center py-3 px-4 md:px-8 gap-3 ${isActive ? "border-r-4 md:border-r-[6px] bg-blue-600/10 text-blue-600" 
          :
          "text-gray-700 border-white hover:bg-gray-100/90"
          }`}>
          <img
            src={item.icon}
            alt={item.name}
            className='min-w-6 min-h-6'/>
            <p className="md:block hidden text-center">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;

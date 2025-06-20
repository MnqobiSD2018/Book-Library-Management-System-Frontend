import React from "react";
import { Bell, UserCircle, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

     document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
   <div className="flex items-center justify-end w-full h-16 px-6 bg-white shadow-md">
  {/* Alert Icon */}
  <button className="relative mr-4 text-gray-600 hover:text-blue-700">
    <Bell size={24} />
    {/* Notification dot (optional) */}
    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
  </button>

  {/* User Dropdown */}
  <div className="relative" ref={dropdownRef}>
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 focus:outline-none"
    >
      <UserCircle size={28} />
    </button>

    {/* Dropdown Menu */}
    {dropdownOpen && (
      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-50">
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
          <Settings size={16} />
          Settings
        </button>
      
      </div>
    )}
  </div>
</div>
  );
};

export default Topbar;

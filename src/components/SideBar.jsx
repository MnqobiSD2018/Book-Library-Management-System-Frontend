import {useState} from "react"
import { LayoutDashboard, Users, BookOpen, Ticket, Clipboard, LogOut, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18}/> },
    { path: "/dashboard/members", label: "Member Management", icon: <Users size={18} />},
    { path: "/dashboard/books", label: "Book Management", icon: <BookOpen size={18} /> },
    { path: "/dashboard/lending", label: "Lending & Fining", icon: <Ticket size={18} /> },
    { path: "/dashboard/reports", label: "Reports", icon: <Clipboard size={18} /> },
    { path: "/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-white text-grey-50 fixed top-0 left-0 shadow-md flex flex-col justify-between">
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-8 flex items-start justify-center gap-2 pt-11 pr-3"> 
          <img src={logo} alt="logo" className="h-8"/>Library System
        </h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-700 transition ${
                location.pathname === item.path ? "bg-blue-700 text-white" : "text-gray-800"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;
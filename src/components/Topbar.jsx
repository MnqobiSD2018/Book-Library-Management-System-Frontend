import React from "react";

const Topbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="w-full h-16 bg-white shadow-md flex justify-between items-center px-6 fixed top-0 left-64 z-10">
      <h1 className="text-xl font-semibold text-gray-800">📖 Library Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;

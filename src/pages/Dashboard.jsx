import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";

const Dashboard = () => {
   const [stats, setStats] = useState({
    bookCount: 0,
    memberCount: 0,
    activeLoans: 0,
    totalLoans: 0,
    totalFines: 0,
  });

  useEffect(() => {
    fetch("/api/dashboard/summary")
      .then((res) => res.json())
      .then(setStats);
  }, []);


  return (
     <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-50 pt-16 px-4 sm:px-10">
        <Topbar />

        <div className="max-w-6xl mx-auto mt-6">
          

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-600">📘 Total Books</h3>
              <p className="text-3xl font-bold text-blue-700">{stats.bookCount}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-600">👥 Members</h3>
              <p className="text-3xl font-bold text-green-600">{stats.memberCount}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-600">📤 Active Loans</h3>
              <p className="text-3xl font-bold text-red-500">{stats.activeLoans}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-600">📑 Total Loans</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.totalLoans}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-600">💰 Fines Owed</h3>
              <p className="text-3xl font-bold text-yellow-600">${stats.totalFines}</p>
            </div>
          </div>

          {/* Optional Summary Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">📈 Summary</h3>
            <ul className="text-gray-700 list-disc list-inside">
              <li>{stats.bookCount} books are available in the system.</li>
              <li>{stats.memberCount} registered members.</li>
              <li>{stats.activeLoans} books currently borrowed.</li>
              <li>Total loans processed: {stats.totalLoans}</li>
              <li>Total fines owed: ${stats.totalFines}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

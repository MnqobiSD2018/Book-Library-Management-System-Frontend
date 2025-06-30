import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";

const Reports = () => {
  const [activeLoans, setActiveLoans] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/api/reports/active-loans")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch active loans");
        return res.json();
      })
      .then(setActiveLoans)
      .catch((err) => console.error("Active Loans Error:", err));

    fetch("/api/members")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch members");
        return res.json();
      })
      .then(setMembers)
      .catch((err) => console.error("Members Error:", err));
  }, []);

  const fetchMemberHistory = async (memberId) => {
    setSelectedMemberId(memberId);
    const res = await fetch(`/api/reports/member-history/${memberId}`);
    const data = await res.json();
    console.log(data);
    setHistory(data);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-50 pt-16 px-4 sm:px-10">
        <Topbar />
        <div className="max-w-6xl mx-auto mt-6">

          <h2 className="text-3xl font-bold mb-4">📊 Reports</h2>

          {/* Active Loans Section */}
          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h3 className="text-xl font-semibold mb-4">Active Loans</h3>
            <table className="w-full text-sm text-left">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="p-2">Book Title</th>
                  <th>Member Name</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeLoans.map((loan, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{loan.bookTitle}</td>
                    <td>{loan.memberName}</td>
                    <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                    <td className={loan.isOverdue ? "text-red-600 font-bold" : "text-green-600"}>
                      {loan.isOverdue ? "Overdue" : "On Time"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Member History Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Member History</h3>

            <select
              className="border p-2 mb-4 rounded-md"
              value={selectedMemberId}
              onChange={(e) => fetchMemberHistory(e.target.value)}
            >
              <option value="">Select Member</option>
              {members.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.fullName}
                </option>
              ))}
            </select>

            {history.length > 0 ? (
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-2">Book Title</th>
                    <th>Checkout</th>
                    <th>Return</th>
                    <th>Fine ($)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{h.bookTitle}</td>
                      <td>{new Date(h.checkoutDate).toLocaleDateString()}</td>
                      <td>{h.returnDate ? new Date(h.returnDate).toLocaleDateString() : "Not Returned"}</td>
                      <td>{h.fine?.amount || 0}</td>
                      <td>{h.fine?.status || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : selectedMemberId && (
              <p className="text-gray-600">No history available for this member.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

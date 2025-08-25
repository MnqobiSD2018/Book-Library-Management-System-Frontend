import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";

const LendingFining = () => {
  const [members, setMembers] = useState([]);
  const [copies, setCopies] = useState([]);
  const [loans, setLoans] = useState([]);
  const [form, setForm] = useState({ memberId: "", copyId: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const fetchAll = async () => {
    const [mRes, cRes, lRes] = await Promise.all([
      fetch("/api/members"),
      fetch("/api/copies"),
      fetch("/api/loans/loans"),
    ]);
    setMembers(await mRes.json());
    setCopies(await cRes.json());
    setLoans(await lRes.json());

  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Submitting form:", form);

    const res = await fetch("/api/loans/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }

    await fetchAll();
    setForm({ memberId: "", copyId: "" });
  };

  const handleReturn = async (loanId) => {
    const res = await fetch(`/api/loans/loans/return/${loanId}`, { method: "PUT" });
    const data = await res.json();

    if (!res.ok) return alert(data.message); 
    
    setSuccess("Book returned successfully.");
    // Filter out the returned loan instead of re-fetching all
    setLoans((prev) => prev.filter((loan) => loan._id !== loanId));

  };

  return (
    <>
      <div class="w-full bg-red-600 text-white text-center py-2 fixed top-0 left-0 z-50">
      🚨 This is just a frontend website with no backend download and run the full project from github 
      <a href="https://github.com/MnqobiSD2018/Book-Library-Management-System-BF"> <u>Here</u></a>
    </div>


    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-50 pt-16 px-4 sm:px-10">
        <Topbar />
        <div className="mt-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            📖 Lending & Fining
          </h2>

          {/* Checkout Form */}
          <div className="bg-white p-6 rounded-2xl shadow mb-8">
            <h3 className="text-xl font-semibold mb-4">Checkout Book</h3>
            {error && <p className="text-red-600 mb-4">{error || success}</p>}
            <form onSubmit={handleCheckout} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={form.memberId}
                onChange={(e) => setForm({ ...form, memberId: e.target.value })}
                className="border p-2 rounded-md"
                required
              >
                <option value="">Select Member</option>
                {members.map((m) => (
                  <option key={m._id} value={m._id}>{m.fullName}</option>
                ))}
              </select>
              <select
                value={form.copyId}
                onChange={(e) => setForm({ ...form, copyId: e.target.value })}
                className="border p-2 rounded-md"
                required
              >
                <option value="">Select Available Copy</option>
                {copies
                  .filter((c) => c.status === "Available")
                  .map((c) => (
                    <option key={c.copyId} value={c._id}>
                      {c.copyId} - {c.bookTitle}
                    </option>
                  ))}
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Checkout
              </button>
            </form>
          </div>

          {/* Loans Table */}
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-100 text-gray-800 text-base">
                <tr>
                  <th className="p-4">Member</th>
                  <th>Copy ID</th>
                  <th>Book</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Fine</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((l) => (
                  <tr
                    key={l._id}
                    className={`border-b ${l.fine > 0 ? "bg-red-50" : ""}`}
                  >
                    <td className="p-4">{l.memberId?.fullName}</td>
                    <td>{l.copyId.copyId}</td>
                    <td>{l.copyId?.bookTitle}</td>
                    <td>{new Date(l.dueDate).toLocaleDateString()}</td>
                    <td>{l.returned ? "Returned" : "Borrowed"}</td>
                    <td>
                      {l.fine > 0
                        ? `$${l.fine} (${l.finePaid ? "Paid" : "Unpaid"})`
                        : "-"}
                    </td>
                    <td>
                      {!l.returned && !l.finePaid && (
                        <button
                          onClick={() => handleReturn(l._id)}
                          className="text-green-600 hover:underline"
                        >
                          Return
                        </button>
                      )}
                      {l.fine > 0 && !l.finePaid && (
                        <span className="text-sm text-red-500"> Pay Fine First</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loans.length === 0 && (
              <div className="p-4 text-center text-gray-500">No active loans found.</div>
            )}
          </div>
        </div>
      </div>
    </div>

    </>  
  
  );
};

export default LendingFining;

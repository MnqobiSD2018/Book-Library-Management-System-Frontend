import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");


  const fetchMembers = async () => {
    const res = await fetch("/api/members");
    const data = await res.json();
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/members/${editingId}` : "/api/members";

    try {

       const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });

        if (!res.ok) {
      const data = await res.json();
      setError(data.message);
      return;
    }

    await fetchMembers();
    setForm({ fullName: "", email: "", phone: "" });
    setEditingId(null);

    } catch (error) {
      console.error("Fetch failed: ", error);
      setError("Server ureachable");
    }

  };

  const handleEdit = (member) => {
    setForm({ fullName: member.fullName, email: member.email, phone: member.phone });
    setEditingId(member._id);
  };

  const handleInactivate = async (id) => {
    const res = await fetch(`/api/members/${id}/inactivate`, { method: "PUT" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.message);
      return;
    }
    fetchMembers();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-50 pt-16 px-4 sm:px-10">
        <Topbar />
        <div className="mt-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">👥 Member Management</h2>

          {/* Form Card */}
          <div className="bg-white p-6 rounded-2xl shadow mb-8">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Member" : "Add New Member"}
            </h3>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="border p-2 rounded-md w-full"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border p-2 rounded-md w-full"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border p-2 rounded-md w-full"
                required
              />
              <div className="col-span-1 md:col-span-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  {editingId ? "Update Member" : "Add Member"}
                </button>
              </div>
            </form>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded-md w-full md:w-1/2"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border px-4 py-2 rounded-md w-full md:w-1/4"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-100 text-gray-800 text-base">
                <tr>
                  <th className="p-4">Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members
                  .filter((m) =>
                    (m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    m.email.toLowerCase().includes(searchTerm.toLowerCase()))
                  )
                  .filter((m) => filterStatus === "All" || m.status === filterStatus)
                  .map((m) => (
                    <tr key={m._id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4">{m.fullName}</td>
                      <td>{m.email}</td>
                      <td>{m.phone}</td>
                      <td>{new Date(m.membershipDate).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            m.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="space-x-2">
                        <button
                          onClick={() => handleEdit(m)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        {m.status === "Active" && (
                          <button
                            onClick={() => handleInactivate(m._id)}
                            className="text-red-600 hover:underline"
                          >
                            Inactivate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {members.length === 0 && (
              <div className="p-4 text-center text-gray-500">No members found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberManagement;

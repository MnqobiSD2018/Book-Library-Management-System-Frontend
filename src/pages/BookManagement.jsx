import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    year: "",
    genre: "",
  });
  const [copyForm, setCopyForm] = useState({ copyId: "", status: "Available" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message);
      return;
    }

    await fetchBooks();
    setForm({ isbn: "", title: "", author: "", publisher: "", year: "", genre: "" });
  };

  const handleAddCopy = async (isbn) => {
    const res = await fetch(`/api/books/${isbn}/copies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(copyForm),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message);
      return;
    }

    await fetchBooks();
    setCopyForm({ copyId: "", status: "Available" });
    setSelectedBook(null);
  };

  const handleDelete = async (isbn) => {
    const res = await fetch(`/api/books/${isbn}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
    } else {
      fetchBooks();
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-50 pt-16 px-4 sm:px-10">
        <Topbar />
        <div className="mt-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">📚 Book Management</h2>

          {/* Book Metadata Form */}
          <div className="bg-f9f9f9 p-6 rounded-2xl shadow mb-8">
            <h3 className="text-xl font-semibold mb-4">Add New Book Metadata</h3>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key.toUpperCase()}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="border p-2 rounded-md w-full"
                  required
                />
              ))}
              <div className="col-span-1 md:col-span-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>

          {/* Book List */}
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-blue-100 text-gray-800 text-base">
                <tr>
                  <th className="p-4">Title</th>
                  <th>ISBN</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>Year</th>
                  <th>Genre</th>
                  <th>Copies</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((b) => (
                  <tr key={b._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 font-medium">{b.title}</td>
                    <td>{b.isbn}</td>
                    <td>{b.author}</td>
                    <td>{b.publisher}</td>
                    <td>{b.year}</td>
                    <td>{b.genre}</td>
                    <td>
                      {b.copies.map((c) => (
                        <div key={c.copyId}>
                          {c.copyId} ({c.status})
                        </div>
                      ))}
                    </td>
                    <td className="space-y-1">
                      <button
                        onClick={() => setSelectedBook(b)}
                        className="text-green-600 hover:underline block"
                      >
                        Add Copy
                      </button>
                      <button
                        onClick={() => handleDelete(b.isbn)}
                        className="text-red-600 hover:underline block"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {books.length === 0 && (
              <div className="p-4 text-center text-gray-500">No books found.</div>
            )}
          </div>

          {/* Add Copy Modal */}
          {selectedBook && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-2xl w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                  Add Copy to "{selectedBook.title}"
                </h3>
                <input
                  placeholder="Copy ID"
                  className="border p-2 mb-2 rounded-md w-full"
                  value={copyForm.copyId}
                  onChange={(e) => setCopyForm({ ...copyForm, copyId: e.target.value })}
                />
                <select
                  className="border p-2 mb-4 rounded-md w-full"
                  value={copyForm.status}
                  onChange={(e) => setCopyForm({ ...copyForm, status: e.target.value })}
                >
                  <option value="Available">Available</option>
                  <option value="Borrowed">Borrowed</option>
                  <option value="Lost">Lost</option>
                </select>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleAddCopy(selectedBook.isbn)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add Copy
                  </button>
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
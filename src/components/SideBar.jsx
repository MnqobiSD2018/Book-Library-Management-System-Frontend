import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Home" },
    { path: "/dashboard/members", label: "Member Management" },
    { path: "/dashboard/books", label: "Book Management" },
    { path: "/dashboard/lending", label: "Lending & Fining" },
    { path: "/dashboard/reports", label: "Reports" },
  ];

  return (
    <div className="w-64 h-screen bg-blue-900 text-white fixed top-0 left-0 shadow-md flex flex-col justify-between">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">📚 Library System</h2>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-blue-700 transition ${
                location.pathname === item.path ? "bg-blue-700" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
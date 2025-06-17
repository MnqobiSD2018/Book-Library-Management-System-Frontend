import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";

const BookManagement = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-100 pt-16 px-10">
        <Topbar />
        <h1 className="text-xl font-bold mb-4">Book Management</h1>
        <p>Manage book metadata and individual copies.</p>
        {/* TODO: Add form and logic to create/delete books */}
      </div>
    </div>
  );
};

export default BookManagement;

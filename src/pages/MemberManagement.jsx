import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";

const MemberManagement = () => {
  return (
   <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-100 pt-16 px-10">
        <Topbar />
        <h1 className="text-2xl font-bold mb-4">👥 Member Management</h1>
        <p className="text-gray-700 mb-6">
          View, add, update, and inactivate library members.
        </p>
        {/* Add table, form, etc. here */}
      </div>
    </div>
  );
};

export default MemberManagement;

import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-100 pt-16 px-10">
        <Topbar />
        <h1 className="pt-10 text-3xl font-semibold mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-700">
          Use the sidebar to manage library members, books, loans, and generate reports.
        </p>
      </div>
    </div>

  );
};

export default Dashboard;

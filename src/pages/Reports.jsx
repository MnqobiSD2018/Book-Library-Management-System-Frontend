import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";

const Reports = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-100 pt-16 px-10">
        <Topbar />
        <h1 className="text-xl font-bold mb-4">Reports</h1>
        <p>Active loans and member history reporting coming here.</p>
        {/* TODO: Display overdue loans and member history */}
      </div>
    </div>
  );
};

export default Reports;

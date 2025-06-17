import Sidebar from "../components/SideBar";
import Topbar from "../components/Topbar";

const LendingFining = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen bg-gray-100 pt-16 px-10">
        <Topbar />
        <h1 className="text-xl font-bold mb-4">Lending & Fining</h1>
        <p>Checkout, return, and fines logic will be added here.</p>
        {/* TODO: Lending form and fine calculations */}
      </div>
    </div>
  );
};

export default LendingFining;

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsGrid from "../components/StatsGrid";
import AuditLog from "../components/AuditLog";
import FileUpload from "../components/FileUpload";
import MapChart from "../components/MapChart";
function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <StatsGrid />
          <AuditLog />
          <FileUpload />
          <MapChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

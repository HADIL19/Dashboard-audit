
import StatsGrid from "../components/StatsGrid";
import AuditLog from "../components/AuditLog";
import FileUpload from "../components/FileUpload";
import MapChart from "../components/MapChart";

function Dashboard() {
  return (
    <div>
      <StatsGrid />
      <AuditLog />
      <FileUpload />
      <MapChart />
    </div>
  );
}

export default Dashboard;


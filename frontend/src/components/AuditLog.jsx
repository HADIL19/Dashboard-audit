import { useEffect, useState } from "react";
import axios from "axios";

function AuditLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/audits");
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Recent Audits</h2>
      <ul className="divide-y divide-gray-200">
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <li key={index} className="py-2 text-gray-700">
              {log.date} - {log.details}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No audit logs available.</p>
        )}
      </ul>
    </div>
  );
}

export default AuditLog;

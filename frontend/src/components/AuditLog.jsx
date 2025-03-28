import { useEffect, useState } from "react";
import axios from "axios";

function AuditLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/audits")
      .then(response => setLogs(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Recent Audits</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index} className="border-b py-2">
            {log.date} - {log.details}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuditLog;

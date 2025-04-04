const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Audit Roaming API is running...");
});

// Dashboard statistics endpoint
app.get("/api/dashboard/stats", (req, res) => {
  const queries = {
    totalAudits: "SELECT COUNT(*) as count FROM audit_logs WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)",
    errorsDetected: "SELECT COUNT(*) as count FROM audit_logs WHERE status = 'error'",
    partnersConnected: "SELECT COUNT(*) as count FROM partners",
    pendingTasks: "SELECT COUNT(*) as count FROM audit_logs WHERE status = 'pending'"
  };
  
  const stats = {};
  let completed = 0;
  
  // Execute all queries in parallel
  Object.keys(queries).forEach(key => {
    db.query(queries[key], (err, result) => {
      if (err) {
        console.error(`Error fetching ${key}:`, err);
        stats[key] = 0;
      } else {
        stats[key] = result[0].count;
      }
      
      completed++;
      if (completed === Object.keys(queries).length) {
        res.json(stats);
      }
    });
  });
});

// Recent audits endpoint
app.get("/api/dashboard/recent-audits", (req, res) => {
  const query = `
    SELECT a.id, DATE_FORMAT(a.created_at, '%d/%m/%Y') as date, 
           p.name as operator, a.status, 
           (SELECT COUNT(*) FROM audit_logs WHERE configuration_id = a.configuration_id AND status = 'error') as errors
    FROM audit_logs a
    JOIN configurations c ON a.configuration_id = c.id
    JOIN partners p ON c.partner_id = p.id
    ORDER BY a.created_at DESC
    LIMIT 10
  `;
  
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Translate status for frontend
    const translatedResults = result.map(row => ({
      ...row,
      status: translateStatus(row.status)
    }));
    
    res.json(translatedResults);
  });
});

// Critical alerts endpoint
app.get("/api/dashboard/critical-alerts", (req, res) => {
  const query = `
    SELECT a.id, p.name as operator, a.error_description as message, 
           DATE_FORMAT(a.created_at, '%d/%m/%Y %H:%i') as timestamp
    FROM audit_logs a
    JOIN configurations c ON a.configuration_id = c.id
    JOIN partners p ON c.partner_id = p.id
    WHERE a.status = 'error' AND a.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    ORDER BY a.created_at DESC
    LIMIT 5
  `;
  
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Partner coverage data endpoint
app.get("/api/dashboard/partner-coverage", (req, res) => {
  const query = `
    SELECT COUNT(DISTINCT id) as totalPartners,
           COUNT(DISTINCT country) as totalCountries
    FROM partners
  `;
  
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Calculate network availability (mock value, could be from real monitoring)
    const coverage = {
      ...result[0],
      networkAvailability: 98.2 // Mock value, could be calculated from real data
    };
    
    res.json(coverage);
  });
});

// Helper function to translate status for frontend
function translateStatus(status) {
  const statusMap = {
    'pending': 'En cours',
    'completed': 'Complété',
    'error': 'Erreur'
  };
  return statusMap[status] || status;
}

// Import routes
const userRoutes = require("./routes/users");
const partnerRoutes = require("./routes/partners");
const configRoutes = require("./routes/configurations");
const auditRoutes = require("./routes/audits");
const reportRoutes = require("./routes/reports");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/configurations", configRoutes);
app.use("/api/audits", auditRoutes);
app.use("/api/reports", reportRoutes);

// Enhanced error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Server error",
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
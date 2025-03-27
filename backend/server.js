const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db"); // ✅ Import db only ONCE

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS result", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Database Connected", result });
    });
});

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

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

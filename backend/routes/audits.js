const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get all audit logs
router.get("/", (req, res) => {
    db.query("SELECT * FROM audit_logs", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Add an audit log
router.post("/", (req, res) => {
    const { configuration_id, error_description, status } = req.body;
    db.query("INSERT INTO audit_logs (configuration_id, error_description, status) VALUES (?, ?, ?)",
        [configuration_id, error_description, status || "pending"],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Audit log added", id: result.insertId });
        }
    );
});

module.exports = router;

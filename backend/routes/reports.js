const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get all reports
router.get("/", (req, res) => {
    db.query("SELECT * FROM reports", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Generate a new report
router.post("/", (req, res) => {
    const { generated_by, audit_summary, report_link } = req.body;
    db.query("INSERT INTO reports (generated_by, audit_summary, report_link) VALUES (?, ?, ?)",
        [generated_by, audit_summary, report_link],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Report generated", id: result.insertId });
        }
    );
});

module.exports = router;

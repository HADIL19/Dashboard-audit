const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get all configurations
router.get("/", (req, res) => {
    db.query("SELECT * FROM configurations", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Add a configuration
router.post("/", (req, res) => {
    const { partner_id, imsi_range, gt_numbers, ip_addresses, services } = req.body;
    db.query("INSERT INTO configurations (partner_id, imsi_range, gt_numbers, ip_addresses, services) VALUES (?, ?, ?, ?, ?)",
        [partner_id, imsi_range, gt_numbers, ip_addresses, JSON.stringify(services)],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Configuration added", id: result.insertId });
        }
    );
});

module.exports = router;

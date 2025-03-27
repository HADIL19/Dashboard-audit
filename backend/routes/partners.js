const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get all partners
router.get("/", (req, res) => {
    db.query("SELECT * FROM partners", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Add a new partner
router.post("/", (req, res) => {
    const { name, country, imsi_range } = req.body;
    db.query("INSERT INTO partners (name, country, imsi_range) VALUES (?, ?, ?)",
        [name, country, imsi_range],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Partner added", id: result.insertId });
        }
    );
});

module.exports = router;

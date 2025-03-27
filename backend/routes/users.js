const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get all users
router.get("/", (req, res) => {
    db.query("SELECT id, name, email, role FROM users", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Create a user
router.post("/", (req, res) => {
    const { name, email, password, role } = req.body;
    db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, password, role || "user"],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "User created", id: result.insertId });
        }
    );
});

// Delete a user
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User deleted" });
    });
});

module.exports = router;

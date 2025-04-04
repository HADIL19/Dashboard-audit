// backend/routes/audits.js
const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get all audit logs
router.get("/", (req, res) => {
    const query = `
        SELECT a.*, c.partner_id, p.name as partner_name 
        FROM audit_logs a
        LEFT JOIN configurations c ON a.configuration_id = c.id
        LEFT JOIN partners p ON c.partner_id = p.id
        ORDER BY a.created_at DESC
    `;
    
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Get audit statistics for dashboard
router.get("/stats", (req, res) => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    // Getting stats with complex queries
    const queries = {
        totalAudits: `SELECT COUNT(*) as count FROM audit_logs WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?`,
        errorsDetected: `SELECT COUNT(*) as count FROM audit_logs WHERE status = 'error' AND MONTH(created_at) = ? AND YEAR(created_at) = ?`,
        pendingTasks: `SELECT COUNT(*) as count FROM audit_logs WHERE status = 'pending'`,
        partnersConnected: `SELECT COUNT(DISTINCT partner_id) as count FROM configurations WHERE status = 'active'`
    };
    
    // Execute all queries in parallel
    const promises = Object.entries(queries).map(([key, query]) => {
        return new Promise((resolve, reject) => {
            db.query(query, [currentMonth, currentYear], (err, result) => {
                if (err) return reject(err);
                resolve({ [key]: result[0].count });
            });
        });
    });
    
    // Get recent audits
    const recentAuditsQuery = `
        SELECT a.id, a.created_at, a.status, a.error_description, 
               p.name as operator, 
               (SELECT COUNT(*) FROM audit_logs 
                WHERE configuration_id = a.configuration_id 
                AND status = 'error' 
                AND DATE(created_at) = DATE(a.created_at)) as error_count
        FROM audit_logs a
        JOIN configurations c ON a.configuration_id = c.id
        JOIN partners p ON c.partner_id = p.id
        ORDER BY a.created_at DESC
        LIMIT 10
    `;
    
    // Get critical alerts
    const criticalAlertsQuery = `
        SELECT a.id, a.error_description as message, a.created_at as timestamp, 
               p.name as operator
        FROM audit_logs a
        JOIN configurations c ON a.configuration_id = c.id
        JOIN partners p ON c.partner_id = p.id
        WHERE a.status = 'error' AND a.severity = 'critical'
        ORDER BY a.created_at DESC
        LIMIT 5
    `;
    
    // Add these promises to our array
    promises.push(
        new Promise((resolve, reject) => {
            db.query(recentAuditsQuery, (err, result) => {
                if (err) return reject(err);
                // Format dates and map status
                const formattedResults = result.map(audit => ({
                    ...audit,
                    date: new Date(audit.created_at).toLocaleDateString('fr-FR'),
                    status: audit.status === 'completed' ? 'Complété' : 
                            audit.status === 'pending' ? 'En cours' : 'Erreur',
                    erreurs: audit.error_count
                }));
                resolve({ recentAudits: formattedResults });
            });
        }),
        new Promise((resolve, reject) => {
            db.query(criticalAlertsQuery, (err, result) => {
                if (err) return reject(err);
                // Format dates for critical alerts
                const formattedResults = result.map(alert => ({
                    ...alert,
                    timestamp: new Date(alert.timestamp).toLocaleString('fr-FR')
                }));
                resolve({ criticalAlerts: formattedResults });
            });
        })
    );
    
    // Wait for all queries and combine results
    Promise.all(promises)
        .then(results => {
            const stats = Object.assign({}, ...results);
            res.json(stats);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// Add an audit log
router.post("/", (req, res) => {
    const { configuration_id, error_description, status, severity } = req.body;
    db.query(
        "INSERT INTO audit_logs (configuration_id, error_description, status, severity) VALUES (?, ?, ?, ?)",
        [configuration_id, error_description, status || "pending", severity || "normal"],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Audit log added", id: result.insertId });
        }
    );
});

// Get audit log by ID
router.get("/:id", (req, res) => {
    db.query(
        `SELECT a.*, c.partner_id, p.name as partner_name 
         FROM audit_logs a
         LEFT JOIN configurations c ON a.configuration_id = c.id
         LEFT JOIN partners p ON c.partner_id = p.id
         WHERE a.id = ?`,
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.length === 0) {
                return res.status(404).json({ message: "Audit log not found" });
            }
            res.json(result[0]);
        }
    );
});

// Update audit log status
router.patch("/:id", (req, res) => {
    const { status, error_description } = req.body;
    
    // Build dynamic query based on provided fields
    let query = "UPDATE audit_logs SET ";
    const queryParams = [];
    
    if (status) {
        query += "status = ?, ";
        queryParams.push(status);
    }
    
    if (error_description) {
        query += "error_description = ?, ";
        queryParams.push(error_description);
    }
    
    // Remove trailing comma and space
    query = query.slice(0, -2);
    
    // Add WHERE clause
    query += " WHERE id = ?";
    queryParams.push(req.params.id);
    
    db.query(query, queryParams, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Audit log not found" });
        }
        res.json({ message: "Audit log updated" });
    });
});

module.exports = router;
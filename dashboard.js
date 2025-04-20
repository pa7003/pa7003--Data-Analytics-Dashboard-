import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Example public route
router.get('/public', async (req, res) => {
  res.json({ message: "Welcome to the dashboard API!" });
});

// Authenticated route
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dashboard_data LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;

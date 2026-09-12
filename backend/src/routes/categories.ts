import { Router, Request, Response } from "express";
import { pool } from "../config/db";

const router = Router();

// GET /api/categories
router.get("/categories", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY title ASC");
    return res.json({ categories: result.rows });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch categories." });
  }
});

// GET /api/destinations
router.get("/destinations", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM destinations ORDER BY name ASC");
    return res.json({ destinations: result.rows });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch destinations." });
  }
});

export default router;

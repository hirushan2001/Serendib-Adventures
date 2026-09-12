import { Router, Request, Response } from "express";
import { pool } from "../config/db";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// GET /api/tours - List all tours with optional filtering
router.get("/", async (req: Request, res: Response) => {
  try {
    const { category, destination, difficulty, search } = req.query;
    let queryStr = "SELECT * FROM tours WHERE 1=1";
    const queryParams: any[] = [];

    if (category && category !== "all") {
      queryParams.push(category);
      queryStr += ` AND (category_id = $${queryParams.length} OR LOWER(category) LIKE $${queryParams.length})`;
    }

    if (destination && destination !== "all") {
      queryParams.push(destination);
      queryStr += ` AND (destination_id = $${queryParams.length} OR LOWER(location) LIKE $${queryParams.length})`;
    }

    if (difficulty && difficulty !== "all") {
      queryParams.push(difficulty);
      queryStr += ` AND LOWER(difficulty) = LOWER($${queryParams.length})`;
    }

    if (search) {
      queryParams.push(`%${search}%`);
      queryStr += ` AND (LOWER(title) LIKE $${queryParams.length} OR LOWER(location) LIKE $${queryParams.length})`;
    }

    queryStr += " ORDER BY created_at DESC";

    const result = await pool.query(queryStr, queryParams);
    return res.json({ count: result.rows.length, tours: result.rows });
  } catch (err) {
    console.error("Error fetching tours:", err);
    return res.status(500).json({ error: "Failed to fetch tours." });
  }
});

// GET /api/tours/:slug - Single tour by slug or ID
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      "SELECT * FROM tours WHERE slug = $1 OR id = $1",
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tour not found." });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching tour detail:", err);
    return res.status(500).json({ error: "Failed to fetch tour detail." });
  }
});

// POST /api/tours - Create new tour (Admin protected)
router.post("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      location,
      category,
      category_id,
      destination_id,
      image,
      duration,
      difficulty,
      price,
      old_price,
      badge,
      featured,
      group_size,
      overview,
      highlights,
      included,
      to_bring,
      itinerary,
      gallery
    } = req.body;

    const id = slug || `tour-${Date.now()}`;

    const result = await pool.query(
      `INSERT INTO tours (
        id, slug, title, location, category, category_id, destination_id, image, duration, difficulty,
        price, old_price, badge, featured, group_size, overview, highlights, included, to_bring, itinerary, gallery
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      RETURNING *`,
      [
        id,
        slug || id,
        title,
        location,
        category,
        category_id,
        destination_id,
        image,
        duration,
        difficulty,
        price,
        old_price || null,
        badge || null,
        featured || false,
        group_size || "2 - 8 People",
        overview,
        JSON.stringify(highlights || []),
        JSON.stringify(included || []),
        JSON.stringify(to_bring || []),
        JSON.stringify(itinerary || []),
        JSON.stringify(gallery || [])
      ]
    );

    return res.status(201).json({ message: "Tour created successfully", tour: result.rows[0] });
  } catch (err) {
    console.error("Error creating tour:", err);
    return res.status(500).json({ error: "Failed to create tour." });
  }
});

// DELETE /api/tours/:id - Delete tour (Admin protected)
router.delete("/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tours WHERE id = $1 OR slug = $1", [id]);
    return res.json({ message: "Tour deleted successfully." });
  } catch (err) {
    console.error("Error deleting tour:", err);
    return res.status(500).json({ error: "Failed to delete tour." });
  }
});

export default router;

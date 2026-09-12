import { Router, Request, Response } from "express";
import { pool } from "../config/db";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// GET /api/bookings - List all bookings (Admin protected)
router.get("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY created_at DESC");
    return res.json({ count: result.rows.length, bookings: result.rows });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return res.status(500).json({ error: "Failed to fetch bookings." });
  }
});

// POST /api/bookings - Create booking inquiry (Public endpoint)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { full_name, email, phone, tour_id, tour_title, preferred_date, guests_count, notes } = req.body;

    if (!full_name || !email || !phone) {
      return res.status(400).json({ error: "Full name, email, and phone number are required." });
    }

    const id = `booking-${Date.now()}`;

    const result = await pool.query(
      `INSERT INTO bookings (
        id, full_name, email, phone, tour_id, tour_title, preferred_date, guests_count, notes, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
      RETURNING *`,
      [id, full_name, email, phone, tour_id || null, tour_title || "General Inquiry", preferred_date || null, guests_count || 2, notes || ""]
    );

    return res.status(201).json({
      message: "Booking inquiry submitted successfully.",
      booking: result.rows[0]
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    return res.status(500).json({ error: "Failed to submit booking inquiry." });
  }
});

// PATCH /api/bookings/:id/status - Update booking status (Admin protected)
router.patch("/:id/status", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Status must be pending, confirmed, or cancelled." });
    }

    const result = await pool.query(
      "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found." });
    }

    return res.json({ message: "Booking status updated.", booking: result.rows[0] });
  } catch (err) {
    console.error("Error updating booking status:", err);
    return res.status(500).json({ error: "Failed to update booking status." });
  }
});

// DELETE /api/bookings/:id - Delete booking (Admin protected)
router.delete("/:id", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM bookings WHERE id = $1", [id]);
    return res.json({ message: "Booking deleted." });
  } catch (err) {
    console.error("Error deleting booking:", err);
    return res.status(500).json({ error: "Failed to delete booking." });
  }
});

export default router;

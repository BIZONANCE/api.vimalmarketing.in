import { Request, Response } from "express";
import pool from "../config/db";

/**
 * GET /api/services/:slug
 */
export const getServiceDetail = async (
  req: Request,
  res: Response
) => {
  const { slug } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        s.id,
        s.title,
        s.slug,
        s.image_url,
        s.short_description,
        s.long_description,
        c.title AS category,
        c.slug  AS category_slug
      FROM services s
      JOIN categories c ON c.id = s.category_id
      WHERE s.slug = $1
        AND s.is_active = true
      LIMIT 1
      `,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("getServiceDetail error:", error);
    return res.status(500).json({
      message: "Failed to fetch service detail",
    });
  }
};

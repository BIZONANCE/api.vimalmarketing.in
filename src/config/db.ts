import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    client.release();
    console.log("✅ PostgreSQL connected");
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

export default pool;
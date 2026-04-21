import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
	host: process.env.PGHOST,
	user: process.env.PGUSER,
	database: process.env.PGDATABASE,
	port: process.env.PGPORT,
});

export default pool;

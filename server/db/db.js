import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

// const config = {
// 	host: process.env.PGHOST,
// 	user: process.env.PGUSER,
// 	database: process.env.PGDATABASE,
// 	port: Number(process.env.PGPORT),
// };
// if (process.env.PGPASSWORD) {
// 	config.password = process.env.PGPASSWORD;
// }

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export default pool;

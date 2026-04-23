import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const config = {
	host: process.env.PGHOST,
	user: process.env.PGUSER,
	database: process.env.PGDATABASE,
	port: Number(process.env.PGPORT),
};
if (process.env.PGPASSWORD) {
	config.password = process.env.PGPASSWORD;
}

const pool = new Pool(config);

export default pool;

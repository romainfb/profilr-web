import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export async function dbConnect() {
  try {
    if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD) {
      throw new Error("Missing environment variables");
    }

    const client = new Client({
      host: PGHOST,
      database: PGDATABASE,
      user: PGUSER,
      password: PGPASSWORD,
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    await client.connect();

    console.log("Connected to database");
    return client;
  } catch (error) {
    console.error("Error connecting to database", error);
  }
}
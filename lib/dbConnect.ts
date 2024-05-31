import dotenv from 'dotenv';
import { Client } from 'pg';

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

    client.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
    });

    await client.connect();

    return client;
  } catch (error) {
    console.error("Error connecting to database", error);
  }
}

import {dbConnect} from "@/lib/dbConnect";
import {User, UserToRegister} from "@/lib/types";


export async function createUserInDb(user: UserToRegister){

  const client = await dbConnect();
  if (!client) throw new Error('Client not found');
  const {username, email, password} = user;
  try {
    const query = {
      text: 'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) returning *',
      values: [username, email, password],
    };
    const result = await client.query(query);
    return result.rows;
  } finally {
    await client.end(); // Fermer la connexion après utilisation
  }
}



export async function checkEmailInDb(email: string) {
  const client = await dbConnect(); // Attendre que le client soit connecté
  if (!client) throw new Error('Client not found');
  try {
    const query = {
      text: 'SELECT * FROM "user" WHERE email = $1',
      values: [email],
    };
    const result = await client.query(query);
    return result.rows[0];
  } finally {
    await client.end(); // Fermer la connexion après utilisation
  }
}

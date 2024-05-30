import { dbConnect } from '@/lib/dbConnect';

export async function getUserById(userId: string) {
  const client = await dbConnect();

  if (!client) {
    throw new Error("Could not connect to database");
  }

  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [userId];
    const result = await client.query(query, values);
    
    if (!result.rows[0]) {
      throw new Error('User not found');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  } finally {
    await client.end();
  }
}
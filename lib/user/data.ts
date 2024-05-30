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
    
    if (result.rows.length === 0) {
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

export async function updateUser(userId: string, data: any) {
  const client = await dbConnect();

  if (!client) {
    throw new Error("Could not connect to database");
  }

  try {
    const query = 'UPDATE users SET email = $1, phone = $2, username = $3, avatar = $4 WHERE id = $5 RETURNING *';
    const values = [data.email, data.phone, data.username, data.avatar, userId];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error updating user data', error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function createUser(data: any) {
  const client = await dbConnect();

  if (!client) {
    throw new Error("Could not connect to database");
  }

  try {
    const query = 'INSERT INTO users (email, phone, username, avatar) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [data.email, data.phone, data.username, data.avatar];
    const result = await client.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  } finally {
    await client.end();
  }
}
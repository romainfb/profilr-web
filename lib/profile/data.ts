import { dbConnect } from '@/lib/dbConnect';

export async function getProfileById(profileId: string) {
  const client = await dbConnect();

  if (!client) {
    throw new Error("Could not connect to database");
  }

  try {
    const query = 'SELECT * FROM profilr WHERE id = $1';
    const values = [profileId];
    const result = await client.query(query, values);

    console.log(profileId, 'userId in getProfileById ICI')
    
    if (result.rows.length === 0) {
      throw new Error('Profile not found');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error fetching profile data', error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function updateProfile(userId: string, data: any) {
  const client = await dbConnect();

  if (!client) {
    throw new Error("Could not connect to database");
  }

  try {
    const query = 'UPDATE profilr SET url = $1, title = $2, image = $3, bio = $4 WHERE user_id = $5 RETURNING *';
    const values = [data.url, data.title, data.image, data.bio, userId];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('Profile not found');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error updating profile data', error);
    throw error;
  } finally {
    await client.end();
  }
}
 
export async function getProfileIdByUserId(userId: string) {
  const client = await dbConnect();

  if (!client) {
    throw new Error("Could not connect to database");
  }

  try {
    const query = 'SELECT id FROM profilr WHERE user_id = $1';
    const values = [userId];
    console.log(userId, 'clientId in getProfileIdByClientId')
    const result = await client.query(query, values);
    
    if (result.rows[0].length === 0) {
      throw new Error('Profile not found');
    }

    console.log('result.rows[0] in getProfileIdByClientId', result.rows[0])

    return result.rows[0];
  } catch (error) {
    console.error('Error fetching profile data', error);
    throw error;
  } finally {
    await client.end();
  }
}
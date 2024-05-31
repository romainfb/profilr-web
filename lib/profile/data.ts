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

export async function updateProfile(profileId: string, data: any) {
  const client = await dbConnect();

  if (!client) {
    throw new Error("Could not connect to database");
  }

  try {
    const query = 'UPDATE profilr SET title = $1, image = $2, bio = $3 WHERE id = $4 RETURNING *';
    const values = [data.title, data.image, data.bio, profileId];
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
    const result = await client.query(query, values);
    
    if (result.rows[0].length === 0) {
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

export async function createProfile(userId: string) {
  const client = await dbConnect();
  const defaultTitle = 'Nouveau Profil';
  // range de 1 a 90
  const idDefaultImage = Math.floor(Math.random() * 90) + 1;
  const defaultImage = `https://avatar.iran.liara.run/public/${idDefaultImage}`;

  if (!client) {
    throw new Error("Could not connect to database");
  }

  try {
    const query = 'INSERT INTO profilr (user_id, title, image) VALUES ($1, $2, $3) RETURNING *';
    const values = [userId, defaultTitle, defaultImage];
    const result = await client.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error('Error creating profile', error);
    throw error;
  } finally {
    await client.end();
  }
}

import { dbConnect } from '../dbConnect';

export async function getLinksByProfileId(profileId: string) {
  const client = await dbConnect();

  if (!client) {
    throw new Error("Could not connect to database");
  }

  try {
    const query = 'SELECT * FROM link WHERE profilr_id = $1';
    const values = [profileId];
    const result = await client.query(query, values);

    return result.rows;
  } catch (error) {
    console.error('Error fetching links data', error);
    throw error;
  } finally {
    await client.end();
  }
}

export async function updateLinks(profileId: string, data: any) {
  const client = await dbConnect();

  if (!client) {
    throw new Error("Could not connect to database");
  }

  try {
    const existingLinks = await client.query('SELECT id FROM link WHERE profilr_id = $1', [profileId]);
    const existingLinkIds = existingLinks.rows.map((link: any) => link.id);

    const results = [];

    for (const link of data) {
      if (link.id) {
        // Update existing link
        const query = `
          UPDATE link 
          SET url = $1, title = $2, description = $3, "order" = $4
          WHERE id = $5 AND profilr_id = $6
          RETURNING *;
        `;
        const values = [link.url, link.title, link.description, link.order, link.id, profileId];
        const result = await client.query(query, values);
        results.push(result.rows[0]);

        // Remove the updated link ID from the existingLinkIds array
        const index = existingLinkIds.indexOf(link.id);
        if (index > -1) {
          existingLinkIds.splice(index, 1);
        }
      } else {
        // Insert new link
        const query = `
          INSERT INTO link (url, title, description, profilr_id)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `;
        const values = [link.url, link.title, link.description, profileId];
        const result = await client.query(query, values);
        results.push(result.rows[0]);
      }
    }

    // Delete removed links
    for (const linkId of existingLinkIds) {
      const query = 'DELETE FROM link WHERE id = $1 AND profilr_id = $2 RETURNING *';
      const values = [linkId, profileId];
      await client.query(query, values);
    }

    return results;
  } catch (error) {
    console.error('Error updating links data', error);
    throw error;
  } finally {
    await client.end();
  }
}
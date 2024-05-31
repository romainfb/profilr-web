
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';

export async function GET(request: NextRequest, { params }: {params: {username: string}}): Promise<NextResponse> {
  
  const { searchParams } = new URL(request.url);
  const username = params.username;
  
  try {
    const client = await dbConnect();
    if(!client) throw new Error('Client not found');
    try {
      const query = {
        text: 'SELECT id FROM "users" WHERE username = $1',
        values: [username]
      };
      const result = await client.query(query);
      const user_id = result.rows[0].id;
      
      const query2 = {
        text: 'SELECT * FROM profilr WHERE user_id = $1',
        values: [user_id]
      }
      const profilr = await client.query(query2);
      const query3 = {
        text: 'SELECT * FROM "link" WHERE profilr_id = $1',
        values: [profilr.rows[0].id]
      };
      
      const links = await client.query(query3);

      const completeProfilr = {
          profilr: profilr.rows[0],
          links: links.rows
      };
      
      return NextResponse.json(completeProfilr);
    } finally {
      await client.end(); // Fermer la connexion après utilisation
    }
  } catch (e: any) {
    return NextResponse.json(e.message, { status: 500 });
  }
}

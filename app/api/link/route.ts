import { auth } from '@/auth';
import { getLinksByProfileId, updateLinks } from '@/lib/link/data';
import { getProfileIdByUserId } from '@/lib/profile/data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Récupérer l'ID de l'utilisateur de l'URL de la requête
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    // Vérifier si l'ID de l'utilisateur est fourni
    if (!userId) {
      throw new Error('User ID is required');
    }

    const {id: profileId} = await getProfileIdByUserId(userId);

    // Appeler la méthode getProfileById pour récupérer le profil de l'utilisateur
    const userProfile = await getLinksByProfileId(profileId.toString());

    // Retourner la réponse avec le profil de l'utilisateur
    return NextResponse.json(userProfile, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    
    const session = await auth();
    const userId = session?.user?.id;
    // Vérifier si l'ID de l'utilisateur est fourni
    if (!userId) {
      throw new Error('User ID is required');
    }

    const {id: profileId} = await getProfileIdByUserId(userId);

    // Récupérer les données de la requête
    const data = await request.json();

    // Appeler la méthode updateProfile pour mettre à jour le profil de l'utilisateur
    const updatedLinks = await updateLinks(profileId, data);

    // Retourner la réponse avec le profil mis à jour de l'utilisateur
    return NextResponse.json(updatedLinks, { status: 200 });

  }
  catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
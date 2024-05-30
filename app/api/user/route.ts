import { getUserById } from '@/lib/user/data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Récupérer l'ID de l'utilisateur de l'URL de la requête
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    // Vérifier si l'ID de l'utilisateur est fourni
    if (!id) {
      throw new Error('User ID is required');
    }

    console.log('-----------------------');
    console.log('-----------------------');
    console.log('-----------------------');
    console.log('-----------------------');
    console.log('-----------------------');
    console.log('-----------------------');
    console.log('-----------------------');
    console.log('-----------------------');
    console.log('-----------------------');
    console.log('id', id);

    // Appeler la méthode getProfileById pour récupérer le profil de l'utilisateur
    const userProfile = await getUserById(id.toString());

    // Créer un nouvel objet userProfile avec les champs spécifiés
    const filteredUserProfile = {
      id: userProfile.id,
      email: userProfile.email,
      phone: userProfile.phone,
      username: userProfile.username,
      avatar: userProfile.avatar
    };

    console.log('filteredUserProfile', filteredUserProfile);

    // Retourner la réponse avec le profil de l'utilisateur filtré
    return NextResponse.json(filteredUserProfile, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
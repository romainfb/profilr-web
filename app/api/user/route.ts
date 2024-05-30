import { createUser, getUserById, updateUser } from '@/lib/user/data';
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

    // Retourner la réponse avec le profil de l'utilisateur filtré
    return NextResponse.json(filteredUserProfile, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    // Récupérer l'ID de l'utilisateur de l'URL de la requête
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    // Vérifier si l'ID de l'utilisateur est fourni
    if (!id) {
      throw new Error('User ID is required');
    }

    // Récupérer les données de la requête
    const data = await request.json();

    // Appeler la méthode updateProfile pour mettre à jour le profil de l'utilisateur
    const updatedUser = await updateUser(id.toString(), data);

    // Retourner la réponse avec le profil mis à jour de l'utilisateur
    return NextResponse.json(updatedUser, { status: 200 });

  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

export async function SET(request: NextRequest): Promise<NextResponse> {
  try {
    // Récupérer les données de la requête
    const data = await request.json();

    // Appeler la méthode createUser pour créer un nouvel utilisateur
    const newUser = await createUser(data);

    // Retourner la réponse avec le nouvel utilisateur créé
    return NextResponse.json(newUser, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
import { getProfileById, getProfileIdByUserId, updateProfile } from '@/lib/profile/data';
import { useSession } from "next-auth/react";
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

    const {id: profileId} = await getProfileIdByUserId(userId.toString());

    // Appeler la méthode getProfileById pour récupérer le profil de l'utilisateur
    const userProfile = await getProfileById(profileId.toString());

    // Retourner la réponse avec le profil de l'utilisateur
    return NextResponse.json(userProfile, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    // Récupérer l'ID de l'utilisateur de l'URL de la requête
    const session = useSession();
    const userId = session.data?.user?.id;
    // Vérifier si l'ID de l'utilisateur est fourni
    if (!userId) {
      throw new Error('User ID is required');
    }

    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');

    console.log('userId in profile route.ts', userId)
    const {id: profileId} = await getProfileIdByUserId(userId.toString());
    console.log('profileId in profile route.ts', profileId)

    // Récupérer les données de la requête
    const data = await request.json();

    // Appeler la méthode updateProfile pour mettre à jour le profil de l'utilisateur
    const updatedProfile = await updateProfile(profileId.toString(), data);

    // Retourner la réponse avec le profil mis à jour de l'utilisateur
    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}


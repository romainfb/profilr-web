// middleware.js
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // Utilisez une clé secrète pour décoder le token JWT
  const secret = process.env.AUTH_SECRET as string;

  // Récupère le token depuis la requête
  //@ts-ignore
  const token = await getToken({ req, secret });

  // URL de la requête actuelle
  const { pathname } = req.nextUrl;
  


  // Vérifie si le token est présent et la requête est pour la page de connexion ou d'inscription
  if (token?.sub && (pathname === '/login' || pathname === '/register')) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Vérifie si le token est absent et la requête n'est pas pour la page de connexion ou d'inscription
  // ou les pages publiques, incluant le profil public
  if (!token && pathname !== '/login' && pathname !== '/register'  && pathname !== '/notfound' && !pathname.startsWith('/profilR')) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Continue la requête si l'utilisateur est authentifié ou si la requête est pour les pages de connexion, d'inscription ou de profil public
  return NextResponse.next();
}

// Configuration du middleware pour matcher toutes les pages sauf celles spécifiées
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

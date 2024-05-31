
# ProfilR - Virtual profile page

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Awesome](https://awesome.re/badge.svg)](https://github.com)![Javascript](https://img.shields.io/badge/javascript-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)

ProfilR is a NextJS-based online profile project designed for showcasing skills, experiences, and projects in a sleek and efficient manner. Developed collaboratively, it offers customizable templates, dynamic content management, and SEO optimization. With responsive design and interactive elements, ProfilR provides a seamless user experience. Join us in shaping the future of digital profiles on GitHub!

## Illustrations

![](https://media.discordapp.net/attachments/2904070


## Sommaire
- [Structure du Projet](#structure-du-projet)
- [Description des Dossiers](#description-des-dossiers)
- [Parcours Utilisateur](#parcours-utilisateur)
    - [1. Page d'Édition de Profil](#1-page-dédition-de-profil)
    - [2. Page d'Inscription](#2-page-dinscription)
    - [3. Page de Connexion](#3-page-de-connexion)
    - [4. Page de Profil Public](#4-page-de-profil-public)
- [Documentation de l'API](#documentation-de-lapi)
    - [Auth](#auth)
    - [User](#user)
    - [Profile](#profile)
    - [Link](#link)

## Structure du Projet

Ce projet est structuré comme suit :

```plaintext
profilr-web
│
├── app
│   ├── api
│   ├── login
│   ├── profilR
│   ├── register
│   ├── favicon.ico
│   ├── global-error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components
├── lib
├── public
├── .env.local
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── auth.ts
├── components.json
├── LICENSE
├── middleware.ts
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```


## Description des Dossiers

- **app**: Contient toutes les pages et les API de l'application.
- **api**: Contient les routes API de l'application.
    - **auth**: Contient les routes et les services liés à l'authentification.
        - **[...nextauth]**: Route de configuration pour NextAuth.
        - **account**: Route pour la gestion des comptes utilisateurs.
        - **register**: Routes et services pour l'enregistrement des utilisateurs.
    - **link**: Route pour la gestion des liens.
    - **profile**: Route pour la gestion des profils utilisateurs.
    - **profilr**: Route pour la gestion des profils personnalisés par nom d'utilisateur.
    - **user**: Route pour la gestion des utilisateurs.
- **login**: Page de connexion.
- **profilR**: Pages pour les profils personnalisés par nom d'utilisateur.
- **register**: Page d'enregistrement des utilisateurs.

## Parcours Utilisateur

L'application comporte quatre pages principales, chacune ayant une fonction spécifique selon que l'utilisateur est connecté ou non.

### 1. Page d'Édition de Profil

- **URL**: `/`
- **Condition**: Accessible uniquement si l'utilisateur est connecté.
- **Description**: Permet à l'utilisateur de modifier et mettre à jour son profil.

### 2. Page d'Inscription

- **URL**: `/register`
- **Condition**: Accessible uniquement si l'utilisateur n'est pas connecté.
- **Description**: Permet aux nouveaux utilisateurs de s'inscrire en fournissant leur email, un mot de passe et un prénom.

### 3. Page de Connexion

- **URL**: `/login`
- **Condition**: Accessible uniquement si l'utilisateur n'est pas connecté.
- **Description**: Permet aux utilisateurs existants de se connecter en fournissant leur email et leur mot de passe.

### 4. Page de Profil Public

- **URL**: `/profilR/[username]`
- **Condition**: Accessible à tous.
- **Description**: Affiche le profil public de l'utilisateur spécifié par le paramètre `username`.

Ces pages assurent un parcours utilisateur fluide et sécurisé, en permettant des interactions adaptées selon l'état de connexion de l'utilisateur.

## Documentation de l'API

### Entités et Endpoints

L'API de l'application se compose de plusieurs endpoints répartis entre différentes entités : Auth, User, Profile, et Link. Chaque endpoint est détaillé ci-dessous avec les données d'entrée et de sortie associées.

### Auth

- **POST /auth/login**
    - **Données d’entrée**:
        - `email`
        - `password`

- **POST /auth/register**
    - **Données d’entrée**:
        - `email`
        - `password`
        - `username`

- **GET /auth/session**
    - **Données de sortie**:
        - `session data` (équivalent de `useSession()` mais pour mobile)

### User

- **GET /user**
    - **Données de sortie**:
        - `id`
        - `username`
        - `email`
        - `phone`
        - `avatar`

- **PATCH /user**
    - **Données d’entrée**:
        - `username`
        - `email`
        - `phone`
        - `avatar`
    - **Données de sortie**:
        - `id`
        - `username`
        - `email`
        - `phone`
        - `avatar`

### Profile

- **GET /profile**
    - **Données de sortie**:
        - Informations du profil utilisateur (à détailler si nécessaire)

### Link

- **GET /link/:id**
    - **Données de sortie**:
        - `id`
        - `title`
        - `description`
        - `category`
        - `logo`
        - `url`
        - `profiler_id`
        - `provider_id`
        - `order`

- **POST /link**
    - **Données d’entrée**:
        - `title`
        - `description`
        - `category`
        - `logo`
        - `url`
        - `profiler_id`
        - `provider_id`
        - `order`


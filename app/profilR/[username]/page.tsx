"use client";

import { DarkMode } from "@/components/DarkMode";
import { LinkCard } from "@/components/LinkCard";
import { DrawerShare } from "@/components/drawer/DrawerShare";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type LinkType = {
  title: string;
  description: string;
  icon: string;
  url: string;
};

export default function ProfilPage() {
  
  const path = usePathname();
  const username = path.split("/")[2];

  useEffect(() => {
    fetch(`/api/profilr/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.profilr.title);
        setBiography(data.profilr.bio);
        setLinks(data.links);
        setAvatar(data.profilr.image);
        setIsLoading(false);
      });
  }, [username]);


  const [isLoading, setIsLoading] = useState(true);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [biography, setBiography] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");


  
  return (
      <section className="flex w-screen h-screen items-center flex-col py-6 px-10 lg:w-2/3 mx-auto">
        {/* Profil bar */}
        {isLoading ? (
            <div role="status" className={'h-screen flex justify-center'}>
              <svg
                aria-hidden="true"
                className="h-8 w-8 animate-spin fill-black text-gray-200 dark:placeholder-gray-500 mx-auto my-auto "
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) :
          (
            <>
              <div className="flex flex-row items-center w-full justify-between">
                <DarkMode />
                <p className="text-lg font-bold">ProfilR</p>
                <DrawerShare />
              </div>
              {/* Profil informations */}
              <div className="flex flex-col items-center space-y-6 lg:mt-8">
                <Avatar className="w-40 h-40 mt-10">
                  <AvatarImage
                    src={avatar}
                    alt="@shadcn"
                    className="w-full h-full"
                  />
                  <AvatarFallback className="w-full h-full">Profil</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex flex-row items-center space-x-3">
                    <h1 className="text-4xl font-bold text-center">{name}</h1>
                  </div>
                  <p className="text-center text-muted-foreground">{username}</p>
                  <p className="text-center text-muted-foreground">{biography}</p>
                </div>
              </div>
              {/* Profil links */}
              <div className="flex flex-col items-center py-16 w-full">
                <div className="flex w-full h-fit flex-row items-center">
                  <p className="text-left w-full mb-2 font-bold text-2xl">
                    Mes liens
                  </p>
                </div>
                <Separator />
                <div className="flex w-full h-fit rounded-2xl flex-col space-y-6 my-6">
                  {links.map((link, index) => (
                    <Link key={index} href={link.url || ''}>
                      <LinkCard
                        title={link.title}
                        description={link.description}
                        icon={link.icon}
                  onDelete={() => {
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
        </>
        )
        }
        
        
      </section>
  );
}



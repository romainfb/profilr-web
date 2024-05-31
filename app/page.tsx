"use client";

import { DarkMode } from "@/components/DarkMode";
import { LinkCard } from "@/components/LinkCard";
import { LogoutPopup } from "@/components/LogoutPopup";
import { DrawerProfileBiographyEdit } from "@/components/drawer/DrawerDescriptionEdit";
import { DrawerLinksAdd } from "@/components/drawer/DrawerLinksAdd";
import { DrawerShare } from "@/components/drawer/DrawerShare";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useDraggableLinkCard } from "@/lib/dnd-utils";
import { handleAddLink, handleDelete, moveLink } from "@/lib/link-utils"; // Importer les fonctions depuis link-utils
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function ProfilPage() {

  const [links, setLinks] = useState([]);
  const [profileBiography, setProfileBiography] = useState<string>("");
  const [profileTitle, setProfileTitle] = useState<string>('');
  const [profileAvatar, setProfileAvatar] = useState(null);
  const [name, setName] = useState(null);

  const session = useSession();
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    if (session.data)
      setCurrentId(session.data?.user?.id as any as number);
  }, [session]);
    

  useEffect(() => {
    if (!currentId) return;
    console.log("AUAAYAYYAYAYYAYA", currentId)
    console.log("AUAAYAYYeAYAYYgAYA", currentId)
    console.log("AUAAYAYYAefYAYYAYA", currentId)

    fetch(`/api/link?id=${currentId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "DFEEEEEEEEEEEEEEEE")
        setLinks(data);
      });

    fetch(`/api/profile?id=${currentId}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileAvatar(data.image);
        setProfileBiography(data.bio);
        setProfileTitle(data.title);
      });

    fetch(`/api/user?id=${currentId}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.username);
      });
  }, [currentId]);

  const moveLinkCallback = moveLink(setLinks);
  const handleAddLinkCallback = handleAddLink(setLinks);
  const handleDeleteCallback = handleDelete(setLinks);

  const handleSave = () => {
    fetch(`/api/profile`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: profileTitle, bio: profileBiography, image: profileAvatar}),
    })
      .then((response) => response.json())
      .then((data) => {
      });

    fetch(`/api/link`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(links),
    })
      .then((response) => response.json())
      .then((data) => {
      });

    fetch(`/api/user`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: name }),
    })
      .then((response) => response.json())
      .then((data) => {
      });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="flex w-screen h-screen items-center flex-col py-6 px-10 lg:w-2/3 mx-auto">
        {/* Profil bar */}
        <div className="flex flex-row items-center w-full justify-between">
          <DarkMode />
          <p className="text-lg font-bold">ProfilR</p>
          <div className="flex space-x-4">
            <DrawerShare />
            <LogoutPopup />
          </div>
        </div>
        {/* Profil informations */}
        <div className="flex flex-col items-center space-y-6 lg:mt-8">
          
        {profileAvatar ? (
          <Avatar className="w-40 h-40 mt-10">
            <AvatarImage
              src={profileAvatar}
              alt="@shadcn"
              className="w-full h-full"
            />
            <AvatarFallback className="w-full h-full">Profil</AvatarFallback>
          </Avatar>
        ) : (
          <Skeleton className="w-40 h-40 rounded-full mt-10" />
        )}

          <div className="flex flex-col items-center space-y-2">
            <div className="flex flex-row items-center space-x-3">

            {profileTitle ? (
              <h1 className="text-4xl font-bold text-center">{profileTitle}</h1>
            ) : (
              <Skeleton className="w-full h-8 rounded-full" />
            )}
              
            </div>

            {name ? (
              <p className="text-center text-muted-foreground">{name}</p>

            ) : (
              <Skeleton className="w-1/2 h-8"/>
            )}
           
          </div>

          <DrawerProfileBiographyEdit
            setProfileBiography={setProfileBiography}
            profileBiography={profileBiography}
          />
          
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
            <DrawerLinksAdd onAddLink={handleAddLinkCallback} />

            {links && links.map((link: {
              title: string;
              description: string;
              icon: string;
              order: number;
            }, index) => (
              <DraggableLinkCard
                key={link.title}
                index={index}
                link={link}
                moveLink={moveLinkCallback}
                onDelete={() => handleDeleteCallback(link.title)}
              />
            ))}

          </div>
        </div>

        <Button className="w-full h-12" onClick={handleSave}>Enregistrer</Button>

      </section>
    </DndProvider>
  );
}

function DraggableLinkCard({
  link,
  index,
  moveLink,
  onDelete,
}: {
  link: {
    title: string;
    description: string;
    icon: string;
    order: number;
  };
  index: number;
  moveLink: (dragIndex: number, hoverIndex: number) => void;
  onDelete: () => void;
}) {
  const { ref, isDragging } = useDraggableLinkCard(index, moveLink);

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <LinkCard
        title={link.title}
        description={link.description}
        icon={link.icon}
        onDelete={onDelete}
      />
    </div>
  );
}

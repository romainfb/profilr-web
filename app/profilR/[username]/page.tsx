"use client";

import { DarkMode } from "@/components/DarkMode";
import { LinkCard } from "@/components/LinkCard";
import { DrawerDescriptionEdit } from "@/components/drawer/DrawerDescriptionEdit";
import { DrawerLinksAdd } from "@/components/drawer/DrawerLinksAdd";
import { DrawerNameEdit } from "@/components/drawer/DrawerNameEdit";
import { DrawerShare } from "@/components/drawer/DrawerShare";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useDraggableLinkCard } from "@/lib/dnd-utils";
import { SetStateAction, useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function ProfilPage() {
  const [links, setLinks] = useState([
    {
      title: "Twitter",
      description: "@supdevinci",
      icon: "Twitter",
      order: 1,
    },
    {
      title: "Instagram",
      description: "@supdevinci",
      icon: "Instagram",
      order: 2,
    },
    {
      title: "Linkedin",
      description: "@supdevinci",
      icon: "Linkedin",
      order: 3,
    },
  ]);

  const [biography, setBiography] = useState("Biographie de Sup de Vinci");
  const [name, setName] = useState("Sup de Vinci");

  const moveLink = useCallback((dragIndex: number, hoverIndex: number) => {
    setLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      const [removed] = updatedLinks.splice(dragIndex, 1);
      updatedLinks.splice(hoverIndex, 0, removed);
      return updatedLinks;
    });
  }, []);

  const handleAddLink = (newLink: {
    title: string;
    description: string;
    icon: string;
    order: number;
  }) => {
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  const handleDelete = (title: string) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.title !== title));
  };

  const handleUpdateDescription = (newDescription: SetStateAction<string>) => {
    setBiography(newDescription);
  };

  const handleUpdateName = (newName: SetStateAction<string>) => {
    setName(newName);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="flex w-screen h-screen items-center flex-col py-6 px-10 lg:w-2/3 mx-auto">
        {/* Profil bar */}
        <div className="flex flex-row items-center w-full justify-between">
          <DarkMode />
          <p className="text-lg font-bold">ProfilR</p>
          <DrawerShare />
        </div>
        {/* Profil informations */}
        <div className="flex flex-col items-center space-y-6 lg:mt-8">
          <Avatar className="w-40 h-40 mt-10">
            <AvatarImage
              src="https://media.licdn.com/dms/image/D4E0BAQF6kjEZaZVDJA/company-logo_200_200/0/1680783093915/sup_de_vinci_logo?e=2147483647&v=beta&t=0YdXfnYCHwo1k42CxvZHDzQu2mNAr4-l7NS1LkpxRgI"
              alt="@shadcn"
              className="w-full h-full"
            />
            <AvatarFallback className="w-full h-full">Profil</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-center space-y-2">
            <div className="flex flex-row items-center space-x-3">
              <h1 className="text-4xl font-bold text-center">{name}</h1>
              <DrawerNameEdit
                onUpdateName={handleUpdateName}
                currentName={name}
              />
            </div>

            <p className="text-center text-muted-foreground">@SupDeVinci</p>
          </div>

          <DrawerDescriptionEdit
            onUpdateDescription={handleUpdateDescription}
            currentDescription={biography}
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
            <DrawerLinksAdd onAddLink={handleAddLink} />

            {links.map((link, index) => (
              <DraggableLinkCard
                key={link.title}
                index={index}
                link={link}
                moveLink={moveLink}
                onDelete={() => handleDelete(link.title)}
              />
            ))}
          </div>
        </div>
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

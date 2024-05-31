"use client";

import { DarkMode } from "@/components/DarkMode";
import { LinkCard } from "@/components/LinkCard";
import { LogoutPopup } from "@/components/LogoutPopup";
import { DrawerProfileBiographyEdit } from "@/components/drawer/DrawerDescriptionEdit";
import { DrawerLinksAdd } from "@/components/drawer/DrawerLinksAdd";
import { DrawerProfileTitleEdit } from "@/components/drawer/DrawerNameEdit";
import { DrawerShare } from "@/components/drawer/DrawerShare";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useDraggableLinkCard } from "@/lib/dnd-utils";
import { handleAddLink, handleDelete, moveLink } from "@/lib/link-utils";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function ProfilPage() {
  const [links, setLinks] = useState<any[]>([]);
  const [profileBiography, setProfileBiography] = useState<string>("");
  const [profileTitle, setProfileTitle] = useState<string>('');
  const [profileAvatar, setProfileAvatar] = useState<string>('');
  const [name, setName] = useState(null);

  const session = useSession();
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (session.data)
      setCurrentId(session.data?.user?.id as any as number);
  }, [session]);


  useEffect(() => {
    if (!currentId) return;

    const fetchData = async () => {
      try {
        const [linksResponse, profileResponse, userResponse] = await Promise.all([
          fetch(`/api/link?id=${currentId}`).then((res) => res.json()),
          fetch(`/api/profile?id=${currentId}`).then((res) => res.json()),
          fetch(`/api/user?id=${currentId}`).then((res) => res.json()),
        ]);
        setLinks(linksResponse);
        setProfileAvatar(profileResponse.image);
        setProfileBiography(profileResponse.bio);
        setProfileTitle(profileResponse.title);
        setName(userResponse.username);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentId, isLoading]);

  const moveLinkCallback = moveLink(setLinks);
  const handleAddLinkCallback = handleAddLink(setLinks);
  const handleDeleteCallback = handleDelete(setLinks);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetch(`/api/profile`, {
          method: "PATCH",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: profileTitle, bio: profileBiography, image: profileAvatar }),
        }),
        fetch(`/api/link`, {
          method: "PATCH",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(links),
        }),
      ]);
      
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="flex w-screen h-screen items-center flex-col py-6 px-10 lg:w-2/3 mx-auto">
        {/* Profil bar */}
        {isLoading ? (
          <div role="status" className="h-screen flex justify-center">
            <svg
              aria-hidden="true"
              className="h-8 w-8 animate-spin fill-black text-gray-200 dark:placeholder-gray-500 mx-auto my-auto"
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
        ) : (
          <>
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
                <Avatar className="w-40 h-40 mt-10 cursor-pointer" onClick={handleProfilePictureClick}>
                  <AvatarImage
                    src={profileAvatar}
                    alt="@shadcn"
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback className="w-full h-full">Profil</AvatarFallback>
                </Avatar>
              ) : (
                <Skeleton className="w-40 h-40 rounded-full mt-10" />
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleProfilePictureChange}
              />

              <div className="flex flex-col items-center space-y-2">
                <div className="flex flex-row items-center space-x-3">
                  {profileTitle ? (
                    <>
                      <h1 className="text-4xl font-bold text-center">{profileTitle}</h1>
                      <DrawerProfileTitleEdit 
                      setProfileTitle={setProfileTitle}
                      profileTitle={profileTitle}/>
                    </>
                  ) : (
                    <Skeleton className="w-full h-8 rounded-full" />
                  )}
                </div>

                {name ? (
                  <p className="text-center text-muted-foreground">{name}</p>
                ) : (
                  <Skeleton className="w-1/2 h-8" />
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
                <p className="text-left w-full mb-2 font-bold text-2xl">Mes liens</p>
              </div>

              <Separator />

              <div className="flex w-full h-fit rounded-2xl flex-col space-y-6 my-6">
                <DrawerLinksAdd onAddLink={handleAddLinkCallback} />

                {links?.map((link, index) => (
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
          </>
        )}
      </section>
    </DndProvider>
  );
}


function DraggableLinkCard({link, index, moveLink, onDelete}: {
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

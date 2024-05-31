import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export function DrawerProfileBiographyEdit({
  setProfileBiography,
  profileBiography,
}: {
  setProfileBiography: (profileBiography: string) => void;
  profileBiography: string;

}) {

  const [isOpen, setIsOpen] = useState(false);
  const [biographyToEdit, setBiographyToEdit] = useState('');

  useEffect(() => {
    setBiographyToEdit(profileBiography);
  }, [profileBiography]);

  const handleUpdate = () => {
    setIsOpen(false);
    setProfileBiography(biographyToEdit);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>

        <DrawerTrigger asChild>
            <Button className="">
              Biographie {<Pen className="h-4 w-4 ml-2 cursor-pointer" />}
            </Button>
        </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Modifier la biographie</DrawerTitle>
            <DrawerDescription>
              Présentez-vous à vos contacts dès maintenant !
              <div className="flex w-full h-fit justify-around mt-4">
                <Input
                  type="text"
                  placeholder="Biographie"
                  className="h-20"
                  value={biographyToEdit}
                  onChange={(e) => setBiographyToEdit(e.target.value)}
                />
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={handleUpdate}>Valider</Button>
            <DrawerClose asChild>
              <Button variant="outline">Annuler</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

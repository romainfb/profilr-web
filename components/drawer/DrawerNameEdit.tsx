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
import { useState } from "react";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export function DrawerProfileTitleEdit({
  setProfileTitle,
  profileTitle,
}: {
  setProfileTitle: (profileTitle: string) => void;
  profileTitle: string;
}) {

  const [isOpen, setIsOpen] = useState(false);
  const [titleToEdit, setTitleToEdit] = useState(profileTitle);

  const { toast } = useToast();
  

  const handleUpdate = () => {
    setIsOpen(false);
    setProfileTitle(titleToEdit);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Pen className="h-5 w-5" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Modifier votre nom</DrawerTitle>
            <DrawerDescription>
              <div className="flex w-full h-fit justify-around mt-4">
                <Input
                  type="text"
                  placeholder="Nom"
                  className="h-fit"
                  value={titleToEdit}
                  onChange={(e) => setTitleToEdit(e.target.value)}
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

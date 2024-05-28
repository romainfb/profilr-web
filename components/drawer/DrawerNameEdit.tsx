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

export function DrawerNameEdit({
  onUpdateName,
  currentName,
}: {
  onUpdateName: (name: string) => void;
  currentName: string;
}) {
  const [name, setName] = useState(currentName);

  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = () => {
    setIsOpen(false);
    onUpdateName(name);
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

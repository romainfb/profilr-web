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
import { Input } from "../ui/input";

export function DrawerLinksEdit() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Pen className="h-6 w-6 ml-2" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm h-[30rem]">
          <DrawerHeader>
            <DrawerTitle>Vos liens</DrawerTitle>
            <DrawerDescription>
              Partagez vos liens à vos contacts dès maintenant
              {/* Share buttons */}
              <div className="flex w-full h-fit justify-around mt-4">
                <Input type="text" placeholder="Biographie" className="h-20" />
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Valider</Button>
            <DrawerClose asChild>
              <Button variant="outline">Annuler</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

import { Alert, AlertTitle } from "@/components/ui/alert";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Facebook, Instagram, Link, Linkedin, Upload, X } from 'lucide-react';
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function DrawerLinksAdd({
  onAddLink,
}: {
  onAddLink: (newLink: any) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [source, setSource] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const handleAddLink = () => {
    setIsOpen(false);
    if (name && description && link && source) {
      const newLink = {
        title: name,
        description,
        icon: getIcon(source),
        order: Date.now(),
      };
      onAddLink(newLink);
      setName("");
      setDescription("");
      setLink("");
      setSource("");
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Alert className="cursor-pointer border-2 border-primary border-dashed">
            <Upload className="h-4 w-4" />
            <AlertTitle>Ajouter un lien</AlertTitle>
          </Alert>
        </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full h-fit overflow-scroll lg:w-2/3 lg:py-10">
          <DrawerHeader>
            <DrawerTitle>Ajoutez un lien</DrawerTitle>
            <DrawerDescription>
              Ajoutez-un lien à votre feed
              <div className="flex w-full items-center text-left justify-start flex-col my-8">
                <Label
                  htmlFor="name"
                  className="w-full font-semibold text-primary"
                >
                  Nom du lien
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Instakilo"
                  className="w-full my-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Label
                  htmlFor="description"
                  className="w-full font-semibold text-primary"
                >
                  Description du lien
                </Label>
                <Input
                  type="text"
                  id="description"
                  placeholder="Retrouvez-moi sur Instakilo !"
                  className="w-full my-4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Label
                  htmlFor="link"
                  className="w-full font-semibold text-primary"
                >
                  Lien
                </Label>
                <Input
                  type="text"
                  id="link"
                  placeholder="https://www.instakilo.com/supdevinci"
                  className="w-full my-4"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />

                <Label
                  htmlFor="source"
                  className="w-full font-semibold text-primary"
                >
                  Source
                </Label>
                <Select value={source} onValueChange={setSource}>
                  <SelectTrigger className="w-full my-4">
                    <SelectValue placeholder="Choisissez un réseau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Réseaux</SelectLabel>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="linkedin">Linkedin</SelectItem>
                      <SelectItem value="twitter">Autre</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={handleAddLink}>Ajouter</Button>
            <DrawerClose asChild>
              <Button variant="outline">Annuler</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function getIcon(source: string) {
  switch (source) {
    case "instagram":
      return <Instagram className="h-4 w-4" />;
    case "facebook":
      return <Facebook className="h-4 w-4" />;
    case "linkedin":
      return <Linkedin className="h-4 w-4" />;
    case "twitter":
      return <X className="h-4 w-4" />;
    default:
      return <Link className="h-4 w-4" />;
  }
}

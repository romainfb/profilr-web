"use client";

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
import { Facebook, Link, Linkedin, Send, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

const shareLink = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export function DrawerShare() {
  const currentUrl = usePathname();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-fit h-fit">
          <Send className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Partager</DrawerTitle>
            <DrawerDescription>
              Partagez vos liens à vos contacts dès maintenant
              <div className="flex w-full h-fit justify-around mt-4">
                <Button
                  className="w-fit h-fit"
                  onClick={() =>
                    shareLink(
                      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        currentUrl
                      )}`
                    )
                  }
                >
                  <Linkedin className="h-6 w-6" />
                </Button>
                <Button
                  className="w-fit h-fit"
                  onClick={() =>
                    shareLink(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        currentUrl
                      )}`
                    )
                  }
                >
                  <Facebook className="h-6 w-6" />
                </Button>
                <Button
                  className="w-fit h-fit"
                  onClick={() =>
                    shareLink(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        currentUrl
                      )}`
                    )
                  }
                >
                  <Twitter className="h-6 w-6" />
                </Button>
                <Button
                  className="w-fit h-fit"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(currentUrl)
                      .then(() => alert("Lien copié dans le presse-papier!"))
                  }
                >
                  <Link className="h-6 w-6" />
                </Button>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Annuler</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

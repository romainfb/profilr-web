// link-utils.ts
import { useCallback } from 'react';

export const moveLink = (setLinks: Function) => 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useCallback((dragIndex: number, hoverIndex: number) => {
    setLinks((prevLinks: any[]) => {
      const updatedLinks = [...prevLinks];
      const [removed] = updatedLinks.splice(dragIndex, 1);
      updatedLinks.splice(hoverIndex, 0, removed);
      return updatedLinks;
    });
  }, [setLinks]);

export const handleAddLink = (setLinks: Function) => 
  (newLink: {
    title: string;
    description: string;
    icon: string;
    order: number;
  }) => {
    setLinks((prevLinks: any[]) => [...prevLinks, newLink]);
  };

export const handleDelete = (setLinks: Function) => 
  (title: string) => {
    setLinks((prevLinks: any[]) => prevLinks.filter((link: any) => link.title !== title));
  };

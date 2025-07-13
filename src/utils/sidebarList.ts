import { FilePlus2, HouseIcon } from "lucide-react";
import type { currPageType } from "../types/currPageType";
import MangaList from "../features/MangaList";

type sidebarProps = {
  title: currPageType;
  icon: React.ElementType;
  page?: React.ElementType;
};

export const sidebarList: sidebarProps[] = [
  {
    title: "Home",
    icon: HouseIcon,
    page: MangaList,
  },
  {
    title: "Add new Manga",
    icon: FilePlus2,
  },
];

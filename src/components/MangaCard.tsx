import { ImageOffIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import type { mangaType } from "../types/mangaType";
import type React from "react";

type mangaProps = {
  data: mangaType;
  setDataManga: React.Dispatch<React.SetStateAction<mangaType[]>>;
};

const MangaCard = ({ data, setDataManga }: mangaProps) => {
  const handleDelete = (id: string): void => {
    const isDelete: boolean = confirm("Want to delete this manga?");
    if (isDelete) {
      setDataManga((prev) => prev.filter((manga) => manga.id != id));
    }
  };

  return (
    <div className="flex w-full flex-col justify-between rounded-md bg-white p-4 shadow-[0px_0px_7px_0px_rgba(0,_0,_0,_0.1)]">
      <div>
        {data.image ? (
          <img
            src={data.image}
            alt={data.title}
            className="mx-auto h-48 w-fit overflow-hidden rounded object-cover object-center transition-all hover:scale-105"
          />
        ) : (
          <div className="bg-slate-20 mx-auto flex h-48 w-full items-center justify-center rounded bg-slate-200">
            <ImageOffIcon className="size-9 text-slate-400" />
          </div>
        )}
        <div className="mt-2">
          <h1 className="text-lg">
            {data.title} ({data.year})
          </h1>
          <h2>{data.author}</h2>
        </div>
      </div>
      <div className="mt-2 flex justify-between gap-1">
        <button className="flex w-full cursor-pointer items-center justify-center gap-1 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">
          <SquarePenIcon size={20} />
          <span className="font-medium">Edit</span>
        </button>
        <button
          onClick={() => handleDelete(data.id)}
          className="flex w-full cursor-pointer items-center justify-center gap-1 rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
        >
          <Trash2Icon size={20} /> <span className="font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default MangaCard;

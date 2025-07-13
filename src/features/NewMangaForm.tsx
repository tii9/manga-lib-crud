import { zodResolver } from "@hookform/resolvers/zod";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fileToBase64 } from "../utils/fileToBase64";
import { mangaSchema, type MangaSchemaType } from "../schemas/mangaSchema";
import type { currPageType } from "../types/currPageType";
import { v4 as uuidv4 } from "uuid";

const currentYear: number = new Date().getFullYear();
const genres: string[] = [
  "Action",
  "Adventure",
  "Romance",
  "Comedy",
  "Horror",
  "Fantasy",
];

type NewMangaFormProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<currPageType>>;
};

const NewMangaForm = ({ setCurrentPage }: NewMangaFormProps) => {
  const [fileName, setFileName] = useState<string | null>("Upload your image");

  const form = useForm<MangaSchemaType>({
    resolver: zodResolver(mangaSchema),
  });

  const handleNewManga = async (data: MangaSchemaType) => {
    const { image, ...rest } = data;
    const base64Image = image ? await fileToBase64(image) : null;
    const uuid = uuidv4();

    console.log(base64Image);

    const newManga = {
      id: uuid,
      ...rest,
      image: base64Image,
    };

    const prevData = JSON.parse(localStorage.getItem("data_manga") || "[]");
    prevData.push(newManga);
    localStorage.setItem("data_manga", JSON.stringify(prevData));

    console.log(prevData);
    alert("Manga Saved");
    setCurrentPage("Home");
  };

  return (
    <div className="grid place-content-center">
      <form
        className="w-[400px] rounded bg-white p-4 shadow-[0px_0px_7px_0px_rgba(0,_0,_0,_0.1)]"
        onSubmit={form.handleSubmit(handleNewManga)}
      >
        <h1 className="mb-2 text-lg font-medium">Add new Manga</h1>
        <div className="grid gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title:</label>
            <input
              className="rounded border px-2 py-1"
              type="text"
              id="title"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="text-red-500">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="author">Author:</label>
            <input
              className="rounded border px-2 py-1"
              type="text"
              id="author"
              {...form.register("author")}
            />
            {form.formState.errors.author && (
              <p className="text-red-500">
                {form.formState.errors.author.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="year">Release Year:</label>
            <select
              id="year"
              className="rounded border px-2 py-1"
              {...form.register("year")}
            >
              <option value={""}>-- Release Year --</option>
              {Array.from({ length: currentYear - 2000 + 1 }, (_, i) => {
                const year = currentYear - i;
                return (
                  <option key={i} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            {form.formState.errors.year && (
              <p className="text-red-500">
                {form.formState.errors.year.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <label htmlFor="genres">Genre:</label>
            <div className="grid grid-cols-3 gap-2">
              {genres.map((genre, index) => (
                <label
                  key={index}
                  htmlFor={genre}
                  className="flex items-center justify-between gap-4 rounded border border-gray-300 bg-white p-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 has-checked:border-blue-600 has-checked:ring-1 has-checked:ring-blue-600"
                >
                  <p className="w-full text-center">{genre}</p>
                  <input
                    id={genre}
                    type="checkbox"
                    value={genre}
                    className="sr-only"
                    {...form.register("genre")}
                  />
                </label>
              ))}
            </div>

            {form.formState.errors.genre && (
              <p className="text-red-500">
                {form.formState.errors.genre?.message}
              </p>
            )}
          </div>

          <div className="mt-2">
            <label
              htmlFor="image"
              className="flex flex-1 items-center justify-center rounded border border-gray-300 p-4 text-gray-900"
            >
              <div className="flex items-center justify-center gap-4">
                <UploadIcon size={20} />
                <span className="font-medium">{fileName}</span>
              </div>
              <input
                type="file"
                id="image"
                className="sr-only"
                {...form.register("image")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFileName(file?.name ?? null); // hanya untuk tampilkan nama
                }}
              />
            </label>
            {typeof form.formState.errors.image?.message === "string" && (
              <p className="text-red-500">
                {form.formState.errors.image?.message}
              </p>
            )}
          </div>
        </div>
        <button className="mt-4 w-full cursor-pointer rounded bg-green-500 py-1 font-medium text-white hover:bg-green-600">
          Add new Manga
        </button>
      </form>
    </div>
  );
};

export default NewMangaForm;

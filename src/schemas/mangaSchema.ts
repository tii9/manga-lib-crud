import z from "zod";

export const mangaSchema = z.object({
  title: z.string().trim().min(1, "Please input a title"),
  author: z.string().trim().min(1, "Please input an author name"),
  year: z
    .string()
    .refine((val) => val != "", "Please input a release year")
    .refine((val) => {
      const year = Number(val);
      return year >= 2000 && year <= new Date().getFullYear();
    }, `Release year must between 2000 and ${new Date().getFullYear()}`),
  genre: z.array(z.string(), "Choose min 1 genre").min(1, "Choose min 1 genre"),
  image: z
    .any()
    .transform((fileList) =>
      fileList instanceof FileList ? fileList[0] : fileList,
    )
    .refine((file) => !file || file instanceof File, {
      message: "Invalid file input",
    })
    .refine(
      (file) => {
        if (!file) return true;
        return file.type.startsWith("image/");
      },
      {
        message: "File must be an image",
      },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 2 * 1024 * 1024;
      },
      {
        message: "Max file size is 2MB",
      },
    )
    .optional(),
});

export type MangaSchemaType = z.infer<typeof mangaSchema>;

import { useEffect, useState } from "react";
import type { mangaType } from "../types/mangaType";
import { dataForManga } from "../utils/dataForManga";
import MangaCard from "../components/MangaCard";

const MangaList = () => {
  const [dataManga, setDataManga] = useState<mangaType[]>(() => {
    const data = localStorage.getItem("data_manga");
    return data ? JSON.parse(data) : dataForManga;
  });

  useEffect(() => {
    localStorage.setItem("data_manga", JSON.stringify(dataManga));
  }, [dataManga]);

  return (
    <div>
      <h1 className="text-xl font-medium">Manga List</h1>
      <div className="my-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {dataManga.length === 0 && <h1>No data found!</h1>}
        {dataManga?.map((data) => (
          <MangaCard key={data.id} data={data} setDataManga={setDataManga} />
        ))}
      </div>
    </div>
  );
};

export default MangaList;

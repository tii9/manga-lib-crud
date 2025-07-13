import { useState } from "react";
import Sidebar from "./components/Sidebar";
import type { currPageType } from "./types/currPageType";
import MangaList from "./features/MangaList";
import NewMangaForm from "./features/NewMangaForm";

const App = () => {
  const [currentPage, setCurrentPage] = useState<currPageType>("Home");

  return (
    <div className="flex bg-slate-100/65">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 p-4">
        {currentPage === "Home" && <MangaList />}
        {currentPage === "Add new Manga" && (
          <NewMangaForm setCurrentPage={setCurrentPage} />
        )}
      </div>
    </div>
  );
};

export default App;

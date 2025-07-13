import type { currPageType } from "../types/currPageType";
import { sidebarList } from "../utils/sidebarList";

type sidebarListProps = {
  currentPage: currPageType;
  setCurrentPage: React.Dispatch<React.SetStateAction<currPageType>>;
};

const Sidebar = ({ currentPage, setCurrentPage }: sidebarListProps) => {
  const handleCurrPage = (page: currPageType) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen w-[250px] flex-col gap-4 bg-white p-4 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)]">
      <h1 className="text-xl font-medium">Manga Library</h1>
      <div className="grid gap-2">
        {sidebarList.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCurrPage(item.title)}
            className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100 ${currentPage == item.title && "bg-slate-50"}`}
          >
            <item.icon size={20} />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

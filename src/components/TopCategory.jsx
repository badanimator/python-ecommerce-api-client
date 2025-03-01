import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useQuery } from "@tanstack/react-query";

function TopCategory() {
  const categories = [{name:"Away Jersey"}, {name:"Home Jersey"}, {name:"Third Jersey"}, {name:"Others"}]

  const [isActive, setIsActive] = useState("");
  return (
    <div className="navbot bg-gray-100 z-30 w-full px-1 md:px-0">
      <div className=" mx-auto md:flex place-items-center max-w-6xl">
        <div className="category overflow-x-auto flex flex-wrap place-items-center py-2">
          <button
            onClick={()=>setIsActive("")}
            className={`${
              isActive == ``
                ? `bg-black text-white shadow-lg `
                : `bg-white text-black`
            } py-2.5 px-6 rounded-3xl text-xs mr-3 mb-2 md:mb-0`}
          >
            All items
          </button>
          {categories.map((cat, key) => (
            <button
              onClick={()=>setIsActive(cat.name)}
              key={key}
              className={`${
                isActive == cat.name
                  ? `bg-black text-white shadow-lg `
                  : `bg-white text-black`
              } py-2.5 px-6 rounded-3xl text-xs mr-3 mb-2 md:mb-0`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <Search />
      </div>
    </div>
  );
}

export default TopCategory;

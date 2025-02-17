import React from "react";
import { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import productService from "../api/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function Search() {
  const [searchStr, setSearchStr] = useState("");
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearchStr, 5000);
    return () => clearTimeout(timeOutId);
  }, [searchStr]);

  const searchResult = useQuery({
    enabled: searchStr.length > 1,
    queryKey: ["search_results", searchStr], 
    queryFn: async ()=>{
      try{
        const res = await productService.getUserProduct(1, searchStr);
        return res.data;
      }catch(errors){
        console.log(errors)
        return
      }
    }
  })

  return (
    <div className="flex flex-grow relative group md:ml-auto justify-between pr-4 place-items-center h-full rounded-3xl bg-white">
      <input
        onChange={(e)=> setSearchStr(e.target.value)}
        className="text-xs group pl-4 rounded-3xl p-2.5 focus:outline-none w-full text-black"
        type="text"
        placeholder="Search product"
        onBlur={(e)=>{
          e.target.value = "";
          setSearchStr("");
        }}
      />
      {
        searchResult.isSuccess && (
          <div className="p-5 shadow-lg hidden duration-100 group-focus-within:inline group-active:inline top-11 bg-white absolute rounded-2xl w-full z-20">
            {
              (searchResult.data.items.length > 0)?
                searchResult.data.items.map((product, key)=> (
                  <Link to={"/products/" + product.slug} key={key}>
                    <div
                        className="p-2 flex place-items-center cursor-pointer text-xs font-light text-black hover:bg-gray-100 active:bg-gray-200"
                      >
                        <span className="mr-3">
                          <img
                            src={product.thumbnail}
                            className="w-7 h-7 mr-1 rounded-lg object-cover"
                            alt=""
                          />
                        </span>
                        <span className="line-clamp-1">
                          {product.name}
                        </span>
                      </div>
                  </Link>
                ))
              :
              <p className="text-xs text-black font-light">No item found</p>
            }
          </div>
        )
      }
      <svg
        className="w-4 h-4 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default Search;

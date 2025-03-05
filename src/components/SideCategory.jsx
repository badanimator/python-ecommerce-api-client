import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import productService from "../api/services/product.service";
import { Plus, Minus, Check, Search } from "react-feather";
import { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";
import { ClipLoader } from "react-spinners";

function SideCategory() {
  const {setSearchStr, setCategory } = useProduct();
  const [str, setStr] = useState("");
  const [openCategory, setOpenCategory] = useState(null);
  const toggleCategory = (key) => setOpenCategory((openCategory===key)? null: key);

  const categories = useQuery({
    refetchOnWindowFocus:false,
    queryKey: ["categories"],
    queryFn: async ()=>{
      try{
        const res = await productService.getCategories()
        return res.data;
      }catch(errors){
        // console.log(errors)
      }
    }
  })

  useEffect(()=>{
    const handler = setTimeout(()=>{
      setSearchStr(str);
    }, 1000);
    return ()=> clearTimeout(handler);
  }, [str])

  return (
    <div className="bg-white border rounded-3xl px-5 py-6 shadow-lg w-2/3 md:w-1/2 lg:w-auto">
      {/* search bar */}
      <div className="flex flex-grow border border-gray-200 relative group md:ml-auto justify-between pr-4 place-items-center h-full rounded-3xl bg-white mb-10">
        <input
          onChange={(e)=>setStr(e.target.value)}
          className="text-xs group pl-4 rounded-3xl p-2.5 focus:outline-none w-full text-black"
          type="text"
          placeholder="What are you looking for?"
        />
        <Search className="w-5 h-5" />
      </div>

      {categories.isLoading && (
        <div className="flex justify-center">
          <ClipLoader size={24} />
        </div>
      )}
      
      {categories.isSuccess && (
        <form className="border-t border-gray-200">
          <h3 className="sr-only text-black">Categories</h3>

          {categories.data.items.map((cat, key)=>(
            <div key={key} className="border-t border-gray-200 px-4 py-6">
              <h3 className="-mx-2 -my-3 flow-root">
                <button onClick={()=> toggleCategory(key)} type="button" className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                  <span className="font-medium text-gray-900">{ cat.name }</span>
                  <span className="ml-6 flex items-center">
                    {openCategory==key? (
                    <Minus 
                      aria-hidden="true" 
                      className="size-7 p-1 relative flex justify-center items-center rounded-full hover:bg-gray-100 active:bg-gray-200 cursor-pointer duration-200"
                    />):(
                    <Plus 
                      aria-hidden="true" 
                      className="size-7 p-1 relative flex justify-center items-center rounded-full hover:bg-gray-100 active:bg-gray-200 cursor-pointer duration-200"
                    />)}
                  </span>
                </button>
              </h3>
              
              <div className={(openCategory==key)?"pt-6":"hidden"}>
                <div className="space-y-6 h-32 overflow-y-auto">
                  {cat?.subfolder?.map((folder, key)=>(
                    <div key={key} className="flex gap-3">
                      <div className="flex h-5 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input onClick={(e)=> setCategory(e.target.value)} value={folder.name} type="checkbox" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                          <Check className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" />
                        </div>
                      </div>
                      <label className="min-w-0 flex-1 text-gray-500">{folder.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </form>
      )}
    </div>
  );
}

export default SideCategory;

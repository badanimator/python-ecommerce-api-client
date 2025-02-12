import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import productService from "../api/services/product.service";
import { useProduct } from "../context/ProductContext";

function SideCategory() {
  const { setCategoryId, categoryId } = useProduct()
  const categories = useQuery({
    refetchOnWindowFocus:false,
    queryKey: ["categories"],
    queryFn: async ()=>{
      try{
        const res = await productService.getCategories()
        return res.data
      }catch(errors){
        // console.log(errors)
      }
    }
  })

  return (
    <>
    {categories.isLoading && (
      <Skeleton className="rounded-3xl px-5 py-6 shadow-lg w-full h-60"/>
    )}
    {categories.isSuccess && (
      <div className="bg-white rounded-3xl px-5 py-6 shadow-lg w-2/3 md:w-1/2 lg:w-auto">
        <h3 className="font-semibold mb-3 text-lg text-black">CATEGORIES</h3>
        <ul className="leading-10 text-xs text-gray-400">
          <li>
            <button
              className={`${
                categoryId == undefined ? `font-semibold text-black` : ``
              } cursor-pointer`}
              onClick={() => setCategoryId(undefined)}
            >
              Explore
            </button>
          </li>
          {
            categories.data.items.map((category, key)=>(
            <li key={key}>
              <button
                className={`${
                  categoryId == category.id ? `font-semibold text-black` : ``
                } cursor-pointer`}
                onClick={() => setCategoryId(category.id)}
              >
                {category.name}
              </button>
            </li>
            ))
          }
        </ul>
      </div>
    )}
    </>
  );
}

export default SideCategory;

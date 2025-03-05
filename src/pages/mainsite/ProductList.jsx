import { Sliders, X } from "react-feather";
import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import SideCategory from "../../components/SideCategory";
import ShopCarousel from "../../components/ShopCarousel";
import ProductsCard from "../../components/ProductsCard";
import Nav from "../../components/Nav";


const ProductList = () => {
  const [open, setOpen] = useState(false);

  return (
    <MainLayout title={"Home page"}>
      <Nav />
      {/* toggle category */}
      <button onClick={() => setOpen(!open)} className="w-12 h-12 rounded-full bg-black fixed z-30 drop-shadow-2xl lg:hidden flex justify-center place-items-center bottom-0 left-0 m-5">
        {open? <X className="w-8 h-8" color="white"  />:<Sliders className="w-5 h-5" color="white" />}
      </button>

      {/* toggle category */}
      <div className="max-w-6xl mx-auto pt-14 md:px-0">
        <div className="grid grid-cols-4 gap-x-6">
          <div className={`${open ? `fixed` : `hidden`} lg:static lg:inline h-screen bg-opacity-30 z-20 flex w-full justify-center place-items-center top-0 lg:p-4`}>
            <SideCategory />
          </div>
          
          <div className="col-span-4 md:col-span-4 lg:col-span-3 flex flex-col p-2 mx-2 md:mx-0">
            <ShopCarousel />
            <ProductsCard />
          </div>
        </div>
      </div>
    </MainLayout>
  )
};

export default ProductList;

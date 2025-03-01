import { useState } from "react";
import { Sliders, Grid, Columns, Filter, ChevronDown } from "react-feather";

import ShopCarousel from "../components/ShopCarousel";
import SideCategory from "../components/SideCategory";
import TopCategory from "../components/TopCategory";
import { useProduct } from "../context/ProductContext";
import Header from "../components/Header";
import Nav from "../components/Nav";

const Shop = ({children, title }) => {
  const {setOrderby, orderby} = useProduct();
  const [sortOpen, setSortOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [grid, setGrid] = useState(4);
  return (
    <>
      <Header title={title} />
      <div className="w-full min-h-screen bg-gray-100 pb-10">
        <Nav />
        <button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 rounded-full bg-black fixed z-30 drop-shadow-2xl lg:hidden flex justify-center place-items-center bottom-0 left-0 m-5"
        >
          <Sliders className="w-6 h-6" color="white" />
        </button>
        <div className="max-w-6xl mx-auto pt-14 md:px-0">
          {/* <TopCategory categories={[]} /> */}
          <div className="grid grid-cols-4 gap-x-6">
            <div
              onClick={() => setOpen(!open)}
              className={`${
                open ? `fixed` : `hidden`
              } lg:static lg:inline h-screen bg-opacity-30 z-20 flex w-full justify-center place-items-center top-0 lg:p-4`}
            >
              <SideCategory />
            </div>
            <div className="col-span-4 md:col-span-4 lg:col-span-3 flex flex-col py-4 mx-2 md:mx-0">
              <ShopCarousel />
              <div className="rounded-2xl overflow-hidden shadow-lg w-full bg-white mt-6 px-5 py-4">
                <div className="mb-3">
                  <div className="flex justify-between place-items-center text-gray-600 text-sm relative">
                    <div className="flex">
                      <button
                        onClick={() => setGrid(4)}
                        className={
                          (grid===4)?
                          "p-1 relative flex justify-center items-center rounded-full bg-gray-200"
                          :
                          "p-1 relative flex justify-center items-center rounded-full hover:bg-gray-100 active:bg-gray-200 cursor-pointer duration-200"
                        }
                      >
                        <Grid className="w-5 h-5" size={15} />
                      </button>
                      <button
                        onClick={() => setGrid(2)}
                        className={
                          (grid===2)?
                          "p-1 relative flex justify-center items-center rounded-full bg-gray-200"
                          :
                          "p-1 relative flex justify-center items-center rounded-full hover:bg-gray-100 active:bg-gray-200 cursor-pointer duration-200"
                        }
                      >
                        <Columns className="w-5 h-5" size={15} />
                      </button>
                    </div>
                    <button
                      onClick={() => setSortOpen(!sortOpen)}
                      className="flex place-items-center hover:bg-gray-100 py-1 px-2 rounded-md active:bg-gray-200"
                    >
                      <Filter className="w-5 h-5 mr-1" />
                      Sort
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>

                    <div
                      className={`${sortOpen ? "absolute" : "hidden"} top-7 shadow-lg rounded-md text-sm right-0 bg-white text-gray-500 z-20 px-2 py-2`}
                    >
                      <ul>
                        <li className="py-1 px-2 rounded-sm hover:bg-gray-100 active:bg-gray-200">
                          <button
                            className={orderby===""?"w-full text-black":"w-full"}
                            onClick={() => {setOrderby("")}}
                          >
                            Newest
                          </button>
                        </li>
                        <li className="py-1 px-2 rounded-sm hover:bg-gray-100 active:bg-gray-200">
                          <button
                            className={orderby==="low_price"?"w-full text-black":"w-full"}
                            onClick={() => {setOrderby("low_price")}}
                          >
                            Price low to high
                          </button>
                        </li>
                        <li className="py-1 px-2 rounded-sm hover:bg-gray-100 active:bg-gray-200">
                          <button
                            className={orderby==="high_price"?"w-full text-black":"w-full"}
                            onClick={() => {setOrderby("high_price")}}
                          >
                            Price high to low
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className={`grid grid-cols-2 md:grid-cols-${grid} lg:grid-cols-${grid} gap-x-4 gap-y-6`}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

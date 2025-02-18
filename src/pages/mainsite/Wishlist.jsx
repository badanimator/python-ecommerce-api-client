import { useWishlist } from "../../context/WishlistContext";
import WishProduct from "../../components/wishProduct";
import Page from "../../layout/Page";
import CardSkeleton from "../../components/CardSkeleton";

function Wishlist() {
  const { wishlistData } = useWishlist();

  return (
    <Page>
        <div className="max-w-6xl mx-auto pt-20 px-5 min-h-screen">
          <div className="bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 md:py-6 md:px-6 pb-3">
            <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 px-4 md:px-0">
              {wishlistData.isSuccess && (wishlistData.data.length > 0)? (
                  wishlistData?.data?.map((item, key) => (
                    <WishProduct item={item} key={key}/>
                  ))
                ):(
                  <div className="text-sm text-gray-400 col-span-2 md:col-span-3 lg:col-span-4 flex justify-center place-items-center">
                    Your wishlist is empty
                  </div>
              )}
              {wishlistData.isLoading && (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              )}
            </div>

            <div className="overflow-hidden md:pl-10 row-start-1 md:col-start-3 mb-6 md:mb-0 h-48 md:h-full">
              <div className="relative">
                <div className="text-white flex justify-center place-items-center text-2xl absolute w-full rounded-xl bg-gray-600 ml-10 bg-opacity-60 font-bold right-0 top-0 h-48 md:h-full">
                  <h1>WISHLIST</h1>
                </div>
                <img
                  src="https://i.ibb.co/N23Cxhz/8b683a2f7a998bdd6df80046dc1f5292.jpg"
                  className="object-cover rounded-xl w-full"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
    </Page>
  );
}

export default Wishlist;

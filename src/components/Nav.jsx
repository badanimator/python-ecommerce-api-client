import { useState } from "react";
import { User, Menu, ShoppingBag, LogOut, Clipboard, Heart, LogIn} from "react-feather";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useWishlist } from "../context/WishlistContext";
import MenuNav from "./MenuNav";

const Nav = () => {
  const { cartData } = useCart();
  const { isLoggedIn, userData, logout } = useUser();
  const { wishlistData } = useWishlist();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openSearchNav, setOpenSearchNav] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <nav className="w-full mx-auto fixed bg-gray-100 z-30 py-2 md:px-0 duration-200">
      <div className="px-2 navtop relative max-w-6xl mx-auto flex justify-between place-items-center py-1.5">
        <div className="burger flex items-center">
          {/* <button onClick={handleOpen}>
            <Menu className="w-6 m-auto h-6 text-black" />
          </button> */}
          <Link to={"/"}>
            <img className="mr-2 ml-3" src="logo.png" width={35} alt="" />
          </Link>
        </div>
        <div className="profile flex items-center place-items-center">
          <Link
            to="/cart" 
            className="w-8 relative flex items-center h-8 mr-1 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200"
          >
            <ShoppingBag className="w-6 m-auto h-6 text-black" />
            <div
              className={` absolute text-xs font-light justify-center text-white text-center w-4 h-4 bg-black rounded-full bottom-0 right-0`}
            >
              {(cartData.isSuccess)?cartData.data.cart_quantity:0}
            </div>
          </Link>
          <Link to={"/wishlist"}>
            <div className="w-8 relative flex items-center h-8 mr-1 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200">
              <Heart className="w-6 m-auto h-6 text-black" />
              <div
                className={` absolute text-xs font-light justify-center text-white text-center w-4 h-4 bg-black rounded-full bottom-0 right-0`}
              >
                {(wishlistData.isSuccess)?wishlistData.data.length:0}
              </div>
            </div>
          </Link>

          {isLoggedIn && (
            <Link
              to={"/orders"}
              className="w-8 relative flex items-center h-8 mr-1 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200"
            >
              <Clipboard className="w-6 m-auto h-6 text-black" />
            </Link>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="w-8 relative flex items-center h-8 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200"
          >
            <User className="w-6 m-auto h-6 text-black" />
            {open && (
              <div className="p-3 bg-white absolute top-11 leading-relaxed right-0 rounded-lg shadow-lg text-xs text-black">
                {isLoggedIn && (
                  <div className="bg-black text-white p-3 rounded-lg">
                    <ul className="text-left w-28">
                      <li className="line-clamp-1">{userData?.data?.fullname}</li>
                      <li className="line-clamp-1">@{userData?.data?.username}</li>
                    </ul>
                  </div>
                )}
                {isLoggedIn && (
                  <div
                    onClick={logout}
                    className="hover:underline mt-2 flex place-items-center justify-end"
                  >
                    <LogOut className="w-6 m-auto h-6 text-black" />
                    Sign out
                  </div>
                )}
                {!isLoggedIn && (
                  <Link to="/auth/login">
                    <div className="hover:underline flex place-items-center">
                      <LogIn className="w-6 h-6 text-black" />
                      <span>
                        Sign In
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </button>
        </div>
      </div>

      <MenuNav handleOpen={handleOpen} isOpen={isOpen} />
    </nav>
  );
};

export default Nav;
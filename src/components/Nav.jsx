import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import MenuNav from "./menunav";
import { User, Menu, ShoppingBag, LogOut } from "react-feather";
import { Link } from "react-router-dom";
import { Clipboard } from "react-feather";
import Search from "./search";

const Nav = () => {
  const { cartData } = useCart();
  const { isLoggedIn, userData, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full mx-auto fixed bg-gray-200 z-30 py-2 md:px-0 duration-200">
      <div className="px-2 navtop relative max-w-6xl mx-auto flex justify-between place-items-center py-1.5">
        <div className="burger flex items-center">
          <button onClick={handleOpen}>
            <Menu className="w-6 m-auto h-6 text-black" />
          </button>
          <h3 className="hidden md:inline text-md mr-2 font-semibold ml-3 text-black">
            TwiGuy
          </h3>
        </div>
        <Search />
        <div className="profile flex items-center place-items-center">
          <Link
            to="/cart"
            className="w-8 relative flex items-center h-8 mr-1 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200"
          >
            <ShoppingBag className="w-6 m-auto h-6 text-black" />
            <div
              className={` absolute text-xs font-light justify-center text-white text-center w-4 h-4 bg-black rounded-full bottom-0 right-0`}
            >
              {(cartData.isSuccess)?cartData.data.quantity:0}
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
                      <li className="line-clamp-1">{userData?.data.fullname}</li>
                      <li className="line-clamp-1">@{userData?.data.username}</li>
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
                      <span>
                        <svg
                          className="w-6 h-6 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                      </span>{" "}
                      Sign In
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
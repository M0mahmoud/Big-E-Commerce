import { store } from "@/store/store";
import { Menu, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { Fragment, useContext, useEffect, useState } from "react";
import DropdownLink from "./DropdownLink";

const Header = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(store);
  const { cart } = state;

  useEffect(() => {
    const itemsArray = Array.isArray(cart.cartItems) ? cart.cartItems : [];
    setCartItemsCount(itemsArray.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header>
      <nav className="flex h-12 justify-between items-center px-4 shadow-md">
        <Link href={"/"} className="text-lg font-bold">
          E-Commerce
        </Link>

        <div>
          <Link href={"/cart"} className="px-2 font-bold">
            Cart
            <span>
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </span>
          </Link>
          {status === "loading" ? (
            "Loading"
          ) : session?.user ? (
            <Menu as={"div"} className={"relative inline-block"}>
              <Menu.Button className="text-blue-600 font-bold">
                {session.user.name}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                  <Menu.Item>
                    <DropdownLink className="dropdown-link" href="/profile">
                      Profile
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/order-history"
                    >
                      Order History
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      className="dropdown-link"
                      href="/"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <Link href="/login" className="p-2">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

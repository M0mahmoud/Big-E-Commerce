import { store } from "@/store/store";
import { Menu, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import DropdownLink from "./DropdownLink";

const Header = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [query, setQuery] = useState("");
  const router = useRouter();

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

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <header>
      <nav className="flex h-12 justify-between items-center px-4 shadow-md">
        <Link href={"/"} className="text-lg font-bold">
          Shop
        </Link>

        <form
          onSubmit={submitHandler}
          className="mx-auto  hidden w-full justify-center md:flex"
        >
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="rounded-tr-none rounded-br-none p-1 text-sm focus:ring-0"
            placeholder="Search..."
          />
          <button
            className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
            type="submit"
            id="searchBtn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>

        <div className="flex gap-1">
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
                  <>
                    {session?.user.isAdmin && (
                      <Menu.Item
                        className="dropdown-link"
                        href="/admin/dashboard"
                      >
                        <DropdownLink>Admin Dashboard</DropdownLink>
                      </Menu.Item>
                    )}
                  </>
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

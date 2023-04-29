import { store } from "@/store/store";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Header = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { state } = useContext(store);
  const { cart } = state;

  useEffect(() => {
    const itemsArray = Array.isArray(cart.cartItems) ? cart.cartItems : [];
    setCartItemsCount(itemsArray.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

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
          <Link href={"/login"} className="px-2 font-bold">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

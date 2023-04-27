import { store } from "@/store/store";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
  const { state } = useContext(store);
  const { cart } = state;
  console.log("cart:", cart)
  console.log("cart:", cart.cartItems.reduce((a, c) => a + c.quanttity, 0))

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
              {cart.cartItems.length > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
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

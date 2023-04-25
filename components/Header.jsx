import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header >
      <nav className="flex h-12 justify-between items-center px-4 shadow-md">
        <Link href={"/"} className="text-lg font-bold">
          E-Commerce
        </Link>

        <div>
          <Link href={"/cart"} className="px-2 font-bold">
            Cart
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

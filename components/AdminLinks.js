import Link from "next/link";
import React from "react";

const AdminLinks = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/admin/dashboard"} className="font-bold">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href={"/admin"} className="font-bold">
            Orders
          </Link>
        </li>
        <li>
          <Link href={"/admin/products"} className="font-bold">
            Products
          </Link>
        </li>
        <li>
          <Link href={"/admin/users"} className="font-bold">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminLinks;

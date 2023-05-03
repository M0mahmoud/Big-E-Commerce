import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <div className="card ">
      <Link href={`/product/${product.slug}`} className="">
        <Image
          src={product.image}
          alt={product.name}
          width={350}
          height={300}
          className="rounded shadow  object-cover w-full"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          onClick={() => addToCartHandler(product)}
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;

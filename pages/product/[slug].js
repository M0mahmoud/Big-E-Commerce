import Layout from "@/components/Layout";
import Product from "@/models/Product";
import { store } from "@/store/store";
import db from "@/utils/db";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const ProductScreen = ({ oneProduct }) => {
  const { state, dispatch } = useContext(store);
  const { push } = useRouter();

  if (!oneProduct) {
    return (
      <>
        <Layout title="Produt Not Found">Product not found</Layout>
      </>
    );
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (x) => x.slug === oneProduct.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${oneProduct._id}`);

    console.log("data:", data);
    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...oneProduct, quantity } });
    push("/cart");
  };

  return (
    <Layout title={oneProduct.name}>
      <div className="py-2 mb-3">
        <Link
          href="/"
          className="py-2 px-4 shadow outline-none rounded bg-[#6b7280] hover:bg-[#4b5563] text-white"
        >
          back to products
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={oneProduct.image}
            alt={oneProduct.name}
            width={640}
            height={640}
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{oneProduct.name}</h1>
            </li>
            <li>Category: {oneProduct.category}</li>
            <li>Brand: {oneProduct.brand}</li>
            <li>
              {oneProduct.rating} of {oneProduct.numReviews} reviews
            </li>
            <li>Description: {oneProduct.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${oneProduct.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {oneProduct.countInStock > 0 ? "In stock" : "Unavailable"}
              </div>
            </div>
            <button
              onClick={addToCartHandler}
              className="primary-button w-full"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      oneProduct: product ? db.convertDocToObj(product) : null,
    },
  };
}

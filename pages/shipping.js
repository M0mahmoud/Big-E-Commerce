import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { store } from "@/store/store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

const Shipping = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const { state, dispatch } = useContext(store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [shippingAddress, setValue]);

  const onSubmit = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push("/payment");
  };
  return (
    <>
      <Layout title="Shipping Address">
        <CheckoutWizard activeStep={1} />

        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="mb-4 text-xl">Shipping Address</h1>

          <div className="mb-4">
            <label htmlFor="fName">Full Name</label>
            <input
              {...register("fullName", {
                required: "Enter full name",
              })}
              id="fName"
              className="w-full"
            />
            {errors.fullName && (
              <div className="text-red-500">{errors.fullName.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="address">Address</label>
            <input
              {...register("address", {
                required: "Enter Your Address",
              })}
              id="address"
              className="w-full"
            />
            {errors.address && (
              <div className="text-red-500">{errors.address.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="city">City</label>
            <input
              id="city"
              {...register("city", {
                required: "Enter Your City",
              })}
              className="w-full"
            />
            {errors.city && (
              <div className="text-red-500">{errors.city.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              className="w-full"
              id="postalCode"
              {...register("postalCode", {
                required: "Please enter postal code",
              })}
            />
            {errors.postalCode && (
              <div className="text-red-500 ">{errors.postalCode.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="country">Country</label>
            <input
              className="w-full"
              id="country"
              {...register("country", {
                required: "Please enter country",
              })}
            />
            {errors.country && (
              <div className="text-red-500 ">{errors.country.message}</div>
            )}
          </div>

          <div className="mb-4 flex justify-between">
            <button className="primary-button">Next</button>
          </div>
        </form>
      </Layout>
    </>
  );
};

Shipping.auth = true;
export default Shipping;

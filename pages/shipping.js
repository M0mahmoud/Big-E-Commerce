import CheckoutWizard from "@/components/CheckoutWizard";
import InputField from "@/components/InputField";
import Layout from "@/components/Layout";
import { store } from "@/store/store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Shipping = () => {
  const methods = useForm();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
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

  const handleInputChange = (name, value) => {
    setValue(name, value);
  };
  return (
    <>
      <Layout title="Shipping Address">
        <CheckoutWizard activeStep={1} />
        <FormProvider {...methods}>
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="mb-4 text-xl">Shipping Address</h1>

            <InputField
              label={"Name"}
              autoFocus
              inputName={"name"}
              rules={{
                required: "Enter Name",
              }}
              type={"text"}
              onInputChange={handleInputChange}
              errors={errors}
            />

            <InputField
              label={"Address"}
              autoFocus
              inputName={"address"}
              rules={{
                required: "Enter Your Address",
              }}
              type={"text"}
              onInputChange={handleInputChange}
              errors={errors}
            />

            <InputField
              label={"City"}
              autoFocus
              inputName={"city"}
              rules={{
                required: "Enter Your City",
              }}
              type={"text"}
              onInputChange={handleInputChange}
              errors={errors}
            />

            <InputField
              label={"Postal Code"}
              autoFocus
              inputName={"postalCode"}
              rules={{
                required: "Enter Your Postal Code",
              }}
              type={"text"}
              onInputChange={handleInputChange}
              errors={errors}
            />

            <InputField
              label={"Country"}
              inputName={"country"}
              rules={{
                required: "Enter Country",
              }}
              type={"text"}
              onInputChange={handleInputChange}
              errors={errors}
            />

            <div className="mb-4 flex justify-between">
              <button className="primary-button">Next</button>
            </div>
          </form>
        </FormProvider>
      </Layout>
    </>
  );
};

Shipping.auth = true;
export default Shipping;

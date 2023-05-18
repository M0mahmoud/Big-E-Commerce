import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { store } from "@/store/store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const router = useRouter();
  const { state, dispatch } = useContext(store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPayment(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPayment) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPayment });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPayment,
      })
    );
    router.push("/placeorder");
  };
  return (
    <Layout title="Payment">
      <CheckoutWizard activeStep={2} />

      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>

        {["PayPal", "Stripe", "CashOnDelivery"].map((pay) => (
          <div key={pay} className="mb-4">
            <input
              type="radio"
              name="payment"
              id={pay}
              className="p-2 outline-none focus:ring-0"
              checked={pay === selectedPayment}
              onChange={() => setSelectedPayment(pay)}
            />
            <label className="p-2" htmlFor={pay}>
              {pay}
            </label>
          </div>
        ))}

        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push("/shipping")}
            type="button"
            className="default-button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
};

Payment.auth = true;
export default Payment;

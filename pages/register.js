import InputField from "@/components/InputField";
import Layout from "@/components/Layout";
import { getError } from "@/utils/error";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const { data: sessionData } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  const methods = useForm();
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (sessionData && sessionData.user) {
      router.push(redirect || "/");
    }
  }, [router, sessionData, redirect]);

  const handleSubmitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleInputChange = (name, value) => {
    setValue(name, value);
  };

  return (
    <Layout title="Create Account">
      <FormProvider {...methods}>
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(handleSubmitHandler)}
        >
          <h1 className="mb-4 text-xl">Register</h1>
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
            label={"Email"}
            autoFocus
            inputName={"email"}
            rules={{
              required: "Enter Email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please Enter Valid Email",
              },
            }}
            type={"email"}
            onInputChange={handleInputChange}
            errors={errors}
          />

          <InputField
            label={"Password"}
            inputName={"password"}
            rules={{
              required: "Enter Password",
              minLength: { value: 6, message: "Password Is More Than 5 Chars" },
            }}
            type={"password"}
            onInputChange={handleInputChange}
            errors={errors}
          />

          <InputField
            label={"Confirm Password"}
            autoFocus
            inputName={"confirmPassword"}
            rules={{
              required: "Please Enter Confirm Password",
              minLength: {
                value: 6,
                message: "Confirm Password Is More Than 5 Chars",
              },
              validate: (value) => value === getValues("password"),
            }}
            type={"password"}
            onInputChange={handleInputChange}
            errors={errors}
          />
          <div className="mb-4 ">
            <button className="primary-button">Register</button>
          </div>

          <div className="mb-4 ">
            Have an account? &nbsp;
            <Link className="text-yellow-600" href="login">
              Login
            </Link>
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default Register;

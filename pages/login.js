import InputField from "@/components/InputField";
import Layout from "@/components/Layout";
import { getError } from "@/utils/error";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { data: sessionData } = useSession();
  const methods = useForm();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (sessionData && sessionData.user) {
      router.push(redirect || "/");
    }
  }, [router, sessionData, redirect]);

  const handleSubmitHandler = async ({ email, password }) => {
    try {
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
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(handleSubmitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <FormProvider {...methods}>
          <InputField
            label={"Email"}
            inputName={"email"}
            rules={{
              required: "Enter Email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                message: "Please Enter Valid Email",
              },
            }}
            type="email"
            autoFocus
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
            type="password"
            onInputChange={handleInputChange}
            errors={errors}
          />
          <div className="mb-4 ">
            <button className="primary-button">Login</button>
          </div>
          <div className="mb-4 ">
            Don&apos;t have an account? &nbsp;
            <Link className="text-yellow-600" href="register">
              Register
            </Link>
          </div>
        </FormProvider>
      </form>
    </Layout>
  );
};

export default LoginPage;

import Layout from "@/components/Layout";
import { getError } from "@/utils/error";
import axios from "axios";
import { signIn, useSession , } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const { data: sessionData } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

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

  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(handleSubmitHandler)}
      >
        <h1 className="mb-4 text-xl">Register</h1>

        <div className="mb-4">
          <label htmlFor="email12">Name</label>
          <input
            {...register("name", {
              required: "Enter Name",
            })}
            type="text"
            className="w-full"
            id="name"
            autoFocus
          />
          {errors.email && (
            <div className=" text-red-500">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email12">Email</label>
          <input
            {...register("email", {
              required: "Enter Email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please Enter Valid Email",
              },
            })}
            type="email"
            className="w-full"
            id="email12"
          />
          {errors.email && (
            <div className=" text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="pass21">Password</label>
          <input
            {...register("password", {
              required: "Enter Password",
              minLength: { value: 6, message: "Password Is More Than 5 Chars" },
            })}
            type="password"
            className="w-full"
            id="pass21"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please Enter Confirm Password",
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 6,
                message: "Confirm Password Is More Than 5 Chars",
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500 ">Password do not match</div>
            )}
        </div>

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
    </Layout>
  );
};

export default Register;

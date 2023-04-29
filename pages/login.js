import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleSubmitHandler = ({ email, password }) => {
    console.log("password:", password);
    console.log("email:", email);
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(handleSubmitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
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
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className=" text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="pass">Password</label>
          <input
            {...register("password", {
              required: "Enter Password",
              minLength: { value: 6, message: "Password Is More Than 5 Chars" },
            })}
            type="password"
            className="w-full"
            id="pass"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link className="text-yellow-600" href="register">
            Register
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default LoginPage;

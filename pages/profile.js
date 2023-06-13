import InputField from "@/components/InputField";
import Layout from "@/components/Layout";
import { getError } from "@/utils/error";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session } = useSession();
  // const {
  //   handleSubmit,
  //   register,
  //   getValues,
  //   setValue,
  //   formState: { errors },
  // } = useForm();

  const methods = useForm();
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  useEffect(() => {
    setValue("name", session?.user.name);
    setValue("email", session?.user.email);
  }, [session?.user, setValue]);

  const handleInputChange = (name, value) => {
    setValue(name, value);
  };

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile updated successfully");
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      <FormProvider {...methods}>
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">Update Profile</h1>

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
          <div className="mb-4">
            <button className="primary-button">Update Profile</button>
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default ProfilePage;

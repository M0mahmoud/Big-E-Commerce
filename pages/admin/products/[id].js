import AdminLinks from "@/components/AdminLinks";
import InputField from "@/components/InputField";
import Layout from "@/components/Layout";
import { getError } from "@/utils/error";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

const EditProduct = () => {
  const { query, router } = useRouter();
  const productId = query.id;

  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const methods = useForm();
  const {
    handleSubmit,
    setValue,

    formState: { errors },
  } = methods;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("name", data.name);
        setValue("slug", data.slug);
        setValue("price", data.price);
        setValue("image", data.image);
        setValue("category", data.category);
        setValue("brand", data.brand);
        setValue("countInStock", data.countInStock);
        setValue("description", data.description);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const uploadHandler = async (e, imageField = "image") => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const {
        data: { signature, timestamp },
      } = await axios("/api/admin/cloudinary-sign");

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: "UPLOAD_SUCCESS" });
      setValue(imageField, data.secure_url);
      toast.success("File uploaded successfully");
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };
  const handleInputChange = (name, value) => {
    setValue(name, value);
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <AdminLinks />
        <div className="md:col-span-3">
          {loading ? (
            <div>LOADING</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <FormProvider {...methods}>
              <form
                className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}
              >
                <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>

                <InputField
                  label={"Name"}
                  autoFocus
                  inputName={"name"}
                  rules={{
                    required: "Enter Product Name",
                  }}
                  type={"text"}
                  onInputChange={handleInputChange}
                  errors={errors}
                />

                <InputField
                  label={"Slug"}
                  inputName={"slug"}
                  rules={{
                    required: "Enter Slug",
                  }}
                  type={"text"}
                  onInputChange={handleInputChange}
                  errors={errors}
                />

                <InputField
                  label={"Price"}
                  inputName={"price"}
                  rules={{
                    required: "Enter Product Price",
                  }}
                  type={"text"}
                  onInputChange={handleInputChange}
                  errors={errors}
                />

                <InputField
                  label={"Image"}
                  inputName={"image"}
                  rules={{
                    required: "Enter Product Image",
                  }}
                  type={"text"}
                  onInputChange={handleInputChange}
                  errors={errors}
                />

                <InputField
                  label={"Category"}
                  inputName={"category"}
                  rules={{
                    required: "Enter Product Category",
                  }}
                  type={"text"}
                  onInputChange={handleInputChange}
                  errors={errors}
                />

                <div className="mb-4">
                  <label htmlFor="imageFile">Upload image</label>
                  <input
                    type="file"
                    className="w-full"
                    id="imageFile"
                    onChange={uploadHandler}
                  />

                  {loadingUpload && <div>Uploading....</div>}
                </div>

                <InputField
                  label={"Brand"}
                  inputName={"brand"}
                  rules={{
                    required: "Enter Brand",
                  }}
                  type={"text"}
                  onInputChange={handleInputChange}
                  errors={errors}
                />

                <InputField
                  label={"countInStock"}
                  inputName={"countInStock"}
                  rules={{
                    required: "Enter countInStock",
                  }}
                  type={"text"}
                  onInputChange={handleInputChange}
                  errors={errors}
                />

                <InputField
                  label={"Description"}
                  inputName={"description"}
                  rules={{
                    required: "Enter Description",
                  }}
                  type={"text"}
                  onInputChange={handleInputChange}
                  errors={errors}
                />

                <div className="mb-4">
                  <button disabled={loadingUpload} className="primary-button">
                    {loadingUpdate ? "Loading" : "Update"}
                  </button>
                </div>

                <div className="mb-4">
                  <Link className="default-button" href={`/admin/products`}>
                    Back
                  </Link>
                </div>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;

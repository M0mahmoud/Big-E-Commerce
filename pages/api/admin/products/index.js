import Product from "@/models/Product";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  const user = await getToken({ req });

  if (!user || !user?.isAdmin) {
    return res.status(401).send("Admin Signin Required");
  }

  if (req.method === "GET") {
    await db.connect();
    const products = await Product.find({});
    await db.disconnect();
    res.send(products);
  } else if (req.method === "POST") {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: "Product Name",
    slug: "sample-name-" + Math.random() * 1000,
    image: "/Your-Image-Path",
    price: 0,
    category: "Product Category",
    brand: "Product Brand",
    countInStock: 0,
    description: "Product Description",
    rating: 0,
    numReviews: 0,
  });
  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: "Product created successfully", product });
};

export default handler;

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
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

export default handler;

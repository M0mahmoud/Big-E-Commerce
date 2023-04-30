import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";

import "react-toastify/dist/ReactToastify.css";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " | E-Commerce" : "E-Commerce"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="E-Commerce website for  developers" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <ToastContainer position="top-right" limit={1} />
      <main className="flex min-h-screen flex-col justify-between ">
        <Header />
        <main className="container m-auto mt-4 px-4">{children}</main>
        <Footer />
      </main>
    </>
  );
};

export default Layout;

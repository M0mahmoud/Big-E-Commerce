// import { Tajawal } from "next/font/google";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

// const tajawal = Tajawal({ subsets: ["latin"] });
// className={tajawal.className}

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " | E-Commerce" : "E-Commerce"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="E-Commerce website for  developers" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col justify-between ">
        <Header />
        <main className="container m-auto mt-4 px-4">{children}</main>
        <Footer />
      </main>
    </>
  );
};

export default Layout;

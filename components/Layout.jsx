// import { Tajawal } from "next/font/google";
import Head from "next/head";

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
      <main>
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
      </main>
    </>
  );
};

export default Layout;

import Head from "next/head";
import React from "react";
import Header from "./Header";

import Footer from './Footer'

const Layout: React.FC<{title: string}> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>

      <Header />
      {children}
      
      <Footer/>
    </div>
  );
};

export default Layout;

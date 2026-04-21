import React from "react";
import Footer from "./Footer/Footer";
import NavBar from "./header/NavBar";

const Layout = ({ children }) => {
  return (
    <div>
      {/* Shared site navigation */}
      <NavBar />
      <main>{children}</main>
      {/* Shared site footer */}
      <Footer />
    </div>
  );
};

export default Layout;

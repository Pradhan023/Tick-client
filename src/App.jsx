import React from "react";
import AllRoute from "./Component/Routes/route";
import Navbar from "./Component/Layout/Navbar";
import Footer from "./Component/Layout/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <AllRoute />
      <Footer />
    </>
  );
};

export default App;

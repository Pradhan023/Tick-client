import React from "react";

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className=" relative bottom-0 text-center text-white bg-sky-900 h-[10vh] ">
        {/* Copyright */}
        <div
          className="text-center md:p-6 p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            Anish Pradhan
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;

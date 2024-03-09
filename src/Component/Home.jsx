import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Nav = useNavigate();
  const accesstoken = localStorage.getItem("accesstoken");
  return (
    <div className="homebg flex justify-center pt-40 lg:pt-48 md:pt-64">
      <div className="bg-white h-fit py-3 px-2 rounded-xl cursor-pointer font-mono lg:text-lg md:text-lg">
        {!accesstoken ? (
          <h1 onClick={() => Nav("/login")}>Let Get Started !Click me</h1>
        ) : (
          <h1 onClick={() => Nav("/ticklist")}>
            Check Your Tick Tick List !Tap me👉
          </h1>
        )}
      </div>
    </div>
  );
};

export default Home;

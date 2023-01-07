import React from "react";
import { Typography, Button } from "@mui/material";
import Login from "./Login";
import Lottie from "react-lottie";
import animationData from "../../Anime/cash.json";
import "../../Style/home.css";

const Home = ({ successLogin }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <div class="cutout">
        <div class="main-title">
          <h1>Cashify</h1>
          <p class="subtitle">Cash management from future.</p>
        </div>
        <div class="anime-cash">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      </div>
      <div class="login-btn">
        <Login successLogin={successLogin} />
      </div>
    </div>
  );
};

export default Home;

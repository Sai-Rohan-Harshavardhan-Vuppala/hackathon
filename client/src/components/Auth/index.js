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
    <div style={{position: "relative"}}>
      <div class="cutout">
        <div class="main-title">
          <Typography variant="h1" component="h1">
            Welcome to Expendio version II
          </Typography>
          <Typography variant="h4" component="h4" sx={{textAlign:"right"}}>
            A place where you can manage your cash
          </Typography>
        </div>
      </div>
      <div class="anime-cash" >
        <Lottie options={defaultOptions} height="80vh" />
      </div>
      <div class="login-btn">
        <Login successLogin={successLogin} />
      </div>
    </div>
  );
};

export default Home;

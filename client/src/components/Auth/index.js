import React from "react";
import { Typography, Button } from "@mui/material";
import Login from "./Login";
import Lottie from 'react-lottie';
import animationData from '../../Anime/cash.json';
import "../../Style/home.css"

const Home = ({ successLogin }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div    >
        <div class="header">
    <div class="header-right">
    <Login successLogin={successLogin} />
    </div>
  </div>
  <div class="content">
  <Lottie options={defaultOptions}
              height={600}
              width={600}/>
  </div>
    </div>
  );
};

export default Home;

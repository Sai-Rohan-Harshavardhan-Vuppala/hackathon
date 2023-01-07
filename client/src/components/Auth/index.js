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
    <div>
<div class="cutout"  >
        <div class="header">
    <div class="header-right">
    <Login successLogin={successLogin} />
    </div>
  </div>
  
  <div class="main-title" >
    <h1>Title</h1>
    <p class='subtitle'>Subtitle</p>
  </div>
  <Lottie class='anime-cash' options={defaultOptions}
              height={400}
              width={400}/>
    </div>
   
    </div>
    
  );
};

export default Home;

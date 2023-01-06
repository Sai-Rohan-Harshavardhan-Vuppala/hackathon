import React from "react";
import { Typography, Button } from "@mui/material";
import Login from "./Login";

const Home = ({ successLogin }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          top: 0,
          width: "90vw",
          justifyContent: "space-between",
        }}
      >
        <h1>Charcha</h1>
        <div
          style={{
            textAlign: "center",
            // backgroundColor: "rgb(200,230,250,0.6)",
            // boxShadow: "0px 0px 15px 5px rgb(0,0,0,0.1)",
            // width: "min(300px, 90%)",
            // transform: "translateY(-100px)",
          }}
        >
          <Login successLogin={successLogin} />
        </div>
      </div>
      <div
        style={{
          textAlign: "left",
          position: "absolute",
          left: "5vw",
          transform: "translateY(-100px)",
        }}
      >
        <Typography variant="h5">A safe space where you can</Typography>
        <div
          style={{
            textTransform: "uppercase",
            display: "flex",
            fontSize: 25,
            height: 27,
            overflow: "hidden",
            margin: "10px 0px",
          }}
        >
          <div className="rotator">
            <div className="rotateUp">
              <div>express</div>
              <div>share</div>
            </div>
          </div>
          <div>your</div>
          <div className="rotator">
            <div className="rotateDown">
              <div>opinions</div>
              <div>thoughts</div>
            </div>
          </div>
        </div>
        <Typography variant="h5">and help one another</Typography>
      </div>
    </div>
  );
};

export default Home;

import { Grid, Box, Typography, Card, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import TargetModal from "./modal";
import axios from "axios";

const Limit = () => {
  const [show, setShow] = useState(false);
  const [targets, setTargets] = useState([]);

  const getTargets = () => {
    axios
      .get("/api/user/targets")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTargets();
  }, []);

  const handleClick = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Grid>
      <Button
        variant="contained"
        style={{
          borderRadius: "20px",
          background: "#1bab7d",
          textTransform: "none",
          width: "150px",
        }}
        startIcon={<CreateIcon />}
        onClick={handleClick}
      >
        New Target
      </Button>
      {show && <TargetModal show={show} handleClose={handleClose} />}
    </Grid>
  );
};

export default Limit;

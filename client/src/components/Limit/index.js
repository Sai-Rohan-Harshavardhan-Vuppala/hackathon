import {
  Grid,
  Box,
  Typography,
  Card,
  Button,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import TargetModal from "./modal";
import axios from "axios";
import DoughnutChart from "../Graphs/Doughnut";
import dayjs from "dayjs";

const Limit = () => {
  const [show, setShow] = useState(false);
  const [targets, setTargets] = useState([]);

  const getTargets = () => {
    axios
      .get("/api/user/targets")
      .then((res) => {
        console.log(res.data.data);
        setTargets(res.data.data);
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
    getTargets();
    setShow(false);
  };

  const doughColor = {
    amount: "rgb(219, 72, 178)",
    sppent: "rgb(255, 99, 132)",
  };

  const InfoCards = (target) => {
    let startDate = dayjs(new Date(target.startDate)).format("DD/MM/YYYY");
    let endDate = dayjs(new Date(target.endDate)).format("DD/MM/YYYY");

    let spent =
      target.spent >= target.amount ? 1 : target.spent / target.amount;
    let balance = 1 - spent;

    return (
      <Paper elevation={5} sx={{ width: "320px", padding: "15px" }}>
        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
            {target.name}
          </Typography>
        </Box>

        <Box
          sx={{
            height: "150px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DoughnutChart
            dataA={spent}
            dataB={balance}
            bgColor="rgb(219, 72, 178)"
          />
        </Box>

        <Grid container sx={{ marginTop: "20px" }}>
          <Grid item xs={4}>
            <Stack>
              <Typography sx={{ fontSize: "16px", color: "gray" }}>
                Budget
              </Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                ₹ {target.amount}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontSize: "16px", color: "gray" }}>
              Timeline
            </Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              {startDate} - {endDate}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: "20px" }}>
          <Stack spacing={1}>
            <Typography sx={{ fontSize: "16px", color: "gray" }}>
              Categories
            </Typography>
            <Stack direction="row" spacing={1}>
              {target.categories.map((category, index) => {
                return (
                  <Chip
                    label={category}
                    key={index}
                    sx={{
                      background: "#D8EBFF",
                      color: "#08284a",
                      fontSize: "16px",
                    }}
                  />
                );
              })}
            </Stack>
          </Stack>
        </Grid>
      </Paper>
    );
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
      <Grid sx={{ marginTop: "20px" }}>
        {targets &&
          targets.map((target) => {
            return InfoCards(target);
          })}
      </Grid>
      {show && <TargetModal show={show} handleClose={handleClose} />}
    </Grid>
  );
};

export default Limit;

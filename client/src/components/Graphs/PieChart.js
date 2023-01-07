import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const PieChart = ({ invoiceData }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const [groupedItems, setGroupedItems] = useState([]);

  //   const [filter, setFilter] = useState(false);

  const handleDate = (value, setHandler) => {
    console.log(value);
    setHandler(value);
  };
  ChartJS.register(ArcElement, Tooltip, Legend);

  const update = (data, filter) => {
    const items = data.reduce((acc, invoice) => {
      if (filter) {
        let x = new Date(startDate);
        x.setHours(0, 0, 0, 0);
        let y = new Date(endDate);
        y.setHours(0, 0, 0, 0);
        let z = new Date(invoice.date);
        z.setHours(0, 0, 0, 0);

        console.log({ x, y, z });
        console.log(x > z || y < z);
        if (invoice.date == null || x > z || z > y) return acc;
      }
      console.log("hi");
      invoice.items.forEach((item) => {
        if (!acc[item.category]) {
          acc[item.category] = [item];
        } else {
          acc[item.category].push(item);
        }
      });
      return acc;
    }, {});
    setGroupedItems(items);
  };

  useEffect(() => {
    update(invoiceData, false);
  }, []);

  const handleFilter = () => {
    update(invoiceData, true);
  };

  const handleReset = () => {
    update(invoiceData, false);
  };
  // group invoiceData items by items.category
  //   const groupedItems = invoiceData.reduce((acc, invoice) => {
  //     invoice.items.forEach((item) => {
  //       if (!acc[item.category]) {
  //         acc[item.category] = [item];
  //       } else {
  //         acc[item.category].push(item);
  //       }
  //     });
  //     return acc;
  //   }, {});

  console.log(groupedItems);

  const data = {
    labels: Object.keys(groupedItems).map((key) => key),
    datasets: [
      {
        label: "Total Cost",
        data: Object.values(groupedItems).map((items) => {
          return items.reduce((acc, item) => {
            return acc + item.value;
          }, 0);
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Stack columnGap={2}>
      <Box
        sx={{ width: "32vw", height: "40vh", marginBottom: "30px" }}
        className="centerAlign"
      >
        {Object.keys(groupedItems).length == 0 ? (
          <Typography sx={{ textAlign: "left" }}>
            No data available for this time range
          </Typography>
        ) : (
          <Pie data={data} />
        )}
      </Box>
      <Box>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid
              columnGap={2}
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingRight: "10px",
              }}
            >
              <Grid item xs={6}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <DesktopDatePicker
                    label="Start date"
                    inputFormat="DD/MM/YYYY"
                    value={startDate}
                    onChange={(value) => handleDate(value, setStartDate)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ m: 1, width: "100%" }}>
                  <DesktopDatePicker
                    label="End date"
                    inputFormat="DD/MM/YYYY"
                    value={endDate}
                    onChange={(value) => handleDate(value, setEndDate)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Grid>
        <Grid
          container
          sx={{
            margin: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            onClick={handleFilter}
            variant="contained"
            style={{
              borderRadius: "20px",
              background: "#6765DE",
              textTransform: "none",
              width: "150px",
            }}
          >
            Filter
          </Button>
          <Button
            onClick={handleReset}
            variant="contained"
            style={{
              borderRadius: "20px",
              background: "#6765DE",
              textTransform: "none",
              width: "150px",
            }}
          >
            Reset
          </Button>
        </Grid>
      </Box>
    </Stack>
  );
};

export default PieChart;

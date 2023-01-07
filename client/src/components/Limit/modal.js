import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import categories from "./../../assets/categories";
import { Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};

export default function FormDialog({ show, handleClose }) {
  const [selectedCategories, setCategories] = useState([]);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [amount, setAmount] = useState();
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const close = () => {
    handleClose();
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDate = (value, setHandler) => {
    console.log(value);
    setHandler(value);
  };

  const submitTarget = () => {
    setError("");
    if (selectedCategories.length == 0) {
      setError("Please select categories");
      return;
    } else if (endDate <= startDate) {
      setError("End date should be greater than start date");
      return;
    } else if (amount <= 0 || isNaN(amount)) {
      setError("Please keep amount greater than 0");
      return;
    } else if (name.length === 0) {
      setError("Please enter name");
      return;
    }

    const data = {
      categories: selectedCategories,
      startDate,
      endDate,
      amount,
      name,
    };

    axios
      .post("/api/user/new-target", data)
      .then((res) => {
        handleClose();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Dialog
        open={show}
        onClose={close}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "580px",
              paddingBottom: "10px",
              maxWidth: "700px",
              minHeight: "450px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle
          style={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "5px" }}
        >
          Target
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make yourself financially strong by setting targets on your
            expenses.
          </DialogContentText>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            style={{ marginTop: "30px" }}
          >
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedCategories}
                  onChange={handleChange}
                  label="Category"
                  input={
                    <OutlinedInput
                      label="Category"
                      style={{ color: "black" }}
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value, index) => (
                        <Chip key={index} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {categories.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      <Checkbox
                        checked={selectedCategories.indexOf(name) > -1}
                      />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid
                  columnGap={2}
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "20px",
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
              <Grid container columnSpacing={2}>
                <Grid item xs={6}>
                  <FormControl sx={{ m: 1, width: "100%", marginTop: "20px" }}>
                    <TextField
                      id="outlined-basic"
                      label="Amount"
                      variant="outlined"
                      value={amount}
                      onChange={(event) =>
                        handleDate(event.target.value, setAmount)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl sx={{ m: 1, width: "100%", marginTop: "20px" }}>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      value={name}
                      onChange={(event) =>
                        handleDate(event.target.value, setName)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {error.length > 0 && (
            <Box
              sx={{
                textAlign: "center",
                marginTop: "5px",
              }}
            >
              <Typography style={{ color: "red" }}>{error}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions style={{ alignSelf: "center" }}>
          <Button
            onClick={submitTarget}
            variant="contained"
            style={{
              borderRadius: "20px",
              background: "#6765DE",
              textTransform: "none",
              width: "150px",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

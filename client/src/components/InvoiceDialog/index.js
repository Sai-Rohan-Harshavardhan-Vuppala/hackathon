import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, MenuItem, Grid, Typography, FormControl } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const categories = [
  "Food",
  "Electronics",
  "Sports",
  "Books",
  "Drinks",
  "Games",
];

export default function FormDialog({ show, handleClose }) {
  const [page, setPage] = useState(0);
  const [date, setDate] = useState(dayjs());

  const inputFile = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [invoiceUrl, setUrl] = useState("");

  const [items, setItems] = useState([]);
  const handleChange = (event, index, key) => {
    let oldItems = [...items];
    oldItems[index][key] = event.target.value;
    setItems(oldItems);
  };

  const addNewItem = () => {
    let oldItems = [...items];
    oldItems.push({
      name: "",
      value: "",
      category: categories[0],
    });
    console.log(oldItems);
    setItems(oldItems);
  };

  const closeModal = () => {
    setItems([]);
    setPage(0);
    setUrl("");
    setUploading(false);
    handleClose();
  };
  const cancelItem = (index) => {
    let oldItems = [...items];
    if (oldItems.length > index) {
      oldItems.splice(index, 1);
      setItems(oldItems);
    }
  };

  const handleDate = (value, setHandler) => {
    console.log(value);
    setHandler(value);
  };

  const submitInvoice = () => {
    const data = {
      items: items,
      url: invoiceUrl,
      date: date,
    };
    // axios request
    console.log(data);

    axios
      .post("/api/invoice/create", data)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    closeModal();
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const onChangeFile = (event) => {
    event.preventDefault();
    var file = event.target.files[0];
    setUploading(true);
    setFileToBase(file);
    // setPage(1);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const image = reader.result;
      processInvoice(image);
    };
  };
  const processInvoice = (file) => {
    axios
      .post("/api/invoice/invoice-file", { file: file })
      .then((res) => {
        const data = res.data.items;
        let values = data.map((item) => {
          return {
            name: item.name,
            value: item.value,
            category: categories[0],
          };
        });
        setItems(values);
        setUrl(res.data.url);
        setUploading(false);
        setPage(1);
      })
      .catch((err) => {
        setUploading(false);
        closeModal();
      });
  };
  return (
    <div>
      <Dialog
        open={show}
        onClose={closeModal}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "650px",
              paddingBottom: "10px",
              maxWidth: "700px",
              minHeight: "500px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle
          style={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "5px" }}
        >
          Details
        </DialogTitle>

        {page === 0 && (
          <Box
            style={{
              border: "1px dashed black",
              height: "400px",
              margin: "30px",
              display: "flex",
              flexFlow: "column",
              columnSpacing: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!uploading && (
              <>
                <Box>
                  <input
                    type="file"
                    id="file"
                    ref={inputFile}
                    style={{ display: "none" }}
                    onChange={onChangeFile}
                  />
                  <Button
                    variant="contained"
                    style={{
                      background: "green",
                      borderRadius: "20px",
                      color: "white",
                      textTransform: "none",
                      margin: "10px",
                    }}
                    onClick={onButtonClick}
                  >
                    Upload
                  </Button>
                </Box>
                <Box>
                  <Typography>Please upload an ivoice file.</Typography>
                </Box>
              </>
            )}
            {uploading && (
              <Box>
                <Box style={{ width: "100%", textAlign: "center" }}>
                  <CircularProgress />
                </Box>
                <Typography>Processing the invoice, please wait.</Typography>
              </Box>
            )}
          </Box>
        )}
        {page === 1 && (
          <>
            <DialogContent>
              <DialogContentText>
                Add new invoice items and their values with corresponding
                categories.
              </DialogContentText>

              {items.map((item, index) => {
                return (
                  <Grid
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      container
                      style={{ marginTop: "20px" }}
                      columnSpacing={3}
                      rowSpacing={1}
                    >
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Name"
                          variant="outlined"
                          size="small"
                          sx={{ fontSize: "5px" }}
                          value={item.name}
                          onChange={(event) =>
                            handleChange(event, index, "name")
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-basic"
                          label="Amount"
                          variant="outlined"
                          size="small"
                          value={item.value}
                          onChange={(event) =>
                            handleChange(event, index, "value")
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="outlined-select-currency"
                          select
                          label="Category"
                          value={item.category}
                          onChange={(event) =>
                            handleChange(event, index, "category")
                          }
                          size="small"
                          style={{ width: "100%" }}
                        >
                          {categories.map((category, index) => (
                            <MenuItem key={index} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                    <Box>
                      <CancelIcon
                        style={{
                          color: "gray",
                          marginTop: "28px",
                          marginLeft: "15px",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                        onClick={() => cancelItem(index)}
                      />
                    </Box>
                  </Grid>
                );
              })}
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box style={{ marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    style={{
                      borderRadius: "20px",
                      background: "#2BC48A",
                      textTransform: "none",
                      fontSize: "12px",
                    }}
                    onClick={addNewItem}
                  >
                    Add item
                  </Button>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                            label="Date"
                            inputFormat="DD/MM/YYYY"
                            value={date}
                            onChange={(value) => handleDate(value, setDate)}
                            size="small"
                            renderInput={(params) => (
                              <TextField {...params} size="small" />
                            )}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </LocalizationProvider>
                </Box>
              </Grid>
            </DialogContent>
            <DialogActions style={{ alignSelf: "center" }}>
              <Button
                onClick={submitInvoice}
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
          </>
        )}
      </Dialog>
    </div>
  );
}

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, MenuItem, Grid, IconButton, Divider } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
const categories = [
  "Food",
  "Electronics",
  "Sports",
  "Books",
  "Drinks",
  "Games",
];

export default function FormDialog({ show, handleClose }) {
  const [category, setCategory] = React.useState("Food");

  const [items, setItems] = useState([
    {
      name: "",
      value: "",
      category: categories[0],
    },
  ]);
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

  const cancelItem = (index) => {
    let oldItems = [...items];
    if (oldItems.length > index) {
      oldItems.splice(index, 1);
      setItems(oldItems);
    }
  };

  const submitInvoice = () => {
    const data = items;
    // axios request
    console.log(data);
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "650px",
              paddingBottom: "10px",
              maxWidth: "700px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle
          style={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "5px" }}
        >
          Details
        </DialogTitle>
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
                      onChange={(event) => handleChange(event, index, "name")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="outlined-basic"
                      label="Amount"
                      variant="outlined"
                      size="small"
                      value={item.value}
                      onChange={(event) => handleChange(event, index, "value")}
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
        </DialogContent>
        <DialogActions style={{ alignSelf: "center" }}>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{
              borderRadius: "20px",
              background: "#6765DE",
              textTransform: "none",
              width: "150px",
            }}
            onClick={submitInvoice}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

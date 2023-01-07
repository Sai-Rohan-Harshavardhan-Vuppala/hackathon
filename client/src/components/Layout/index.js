import React, { useState } from "react";
import SideBar from "../SideBar";
import { Routes, Route } from "react-router";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import Dashboard from "../Dashboard";
import Profile from "../Profile";
import TopBar from "./../TopBar";
import InvoiceDialog from "./../InvoiceDialog";
import componentStyles from "../../assets/layout";
const useStyles = makeStyles(componentStyles);

const Layout = ({ user }) => {
  const classes = useStyles();

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <SideBar />
      <Box position="relative" className={classes.mainContent}>
        <TopBar
          username={user.username}
          image={user.image}
          showModal={handleClick}
        />
        <Box style={{ marginTop: "30px", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Box>
      </Box>
      <InvoiceDialog show={show} handleClose={handleClose} />
    </div>
  );
};

export default Layout;

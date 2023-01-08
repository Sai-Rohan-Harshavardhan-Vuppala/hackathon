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
import Trans from "../TopBar/Transactions";
import Grid from "@mui/material/Grid";
import Limit from "./../Limit";

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
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transactions" element={<Trans data={user.invoices} />} />
            <Route path="/target" element={<Limit />} />
          </Routes>
        </Box>
      </Box>
      <InvoiceDialog show={show} handleClose={handleClose} />
    </div>
  );
};

// import  Trans from "../Transactions";
// const Wrapper = () => {
//   var data =[ { category: 'Food', date: '1st January 2023', amount: '10$'},
//               { category: 'Clothing', date: '6th January 2023', amount: '20$'},
//               { category: 'Electricity', date: '31st December 2022', amount: '8$'},
//               { category: 'Petrol', date: '1st January 2022', amount: '13$'}
//             ];
//   return (
//     <div>
//       <Routes>
//         <Route path="/Transactions" element={<Trans data = {data}/>} />
//       </Routes>
export default Layout;

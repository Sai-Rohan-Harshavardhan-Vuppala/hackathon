import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  ChevronRight,
  Dashboard,
  Receipt,
  CurrencyRupee,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import "../Style/sidebar.css";

const listImage = [
  "https://png.pngtree.com/png-vector/20220611/ourlarge/pngtree-bank-expense-report-icon-png-image_4983446.png",
  "https://i.pinimg.com/originals/bd/f1/68/bdf16829b78e875422ec5816c704b42d.png",
];

const SideBarList = ({ bgColor, header, value, imgSrc }) => {
  return (
    <Grid container spacing={2} className="sidebar__list">
      <Grid item>
        <Box
          sx={{
            width: 60,
            height: 60,
            backgroundColor: `${bgColor}`,
            borderRadius: 2,
            boxShadow: 6,
            overflow: "hidden",
          }}
        >
          <img src={imgSrc} alt="Total Expense" width="100%" />
        </Box>
      </Grid>
      <Grid item className="centerAlign">
        <Box>
          <Typography variant="button" sx={{ fontWeight: "bold" }}>
            {header}
          </Typography>
          <Typography variant="subtitle1">$ {value}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const SideBarMenu = ({ link, title, icon }) => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={3}
      onClick={() => navigate(link)}
      className="menuItem"
      mt={1}
    >
      <Grid item>{icon}</Grid>
      <Grid item xs={9}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="button" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <ChevronRight />
        </Box>
      </Grid>
    </Grid>
  );
};

const SideBar = () => {
  return (
    <div className="sidebar">
      <Box>
        <Grid container spacing={2} className="sidebar__title">
          <Grid item>
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/expenses-calculation-6482746-5373624.png"
              width={80}
              height={80}
              alt="Icon"
              className="sidebar_icon"
            />
          </Grid>
          <Grid item className="centerAlign">
            <Typography variant="h4" className="sidebar_header">
              Expendio
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <SideBarList
        bgColor="lightblue"
        header="TOTAL EXPENSE"
        value="10,000"
        imgSrc={listImage[0]}
      />
      <SideBarList
        bgColor="lightblue"
        header="MONTHLY ALLOWANCE"
        value="15,000"
        imgSrc={listImage[1]}
      />
      <Box mt={4} pl={3}>
        <SideBarMenu
          link="/"
          title="Dashboard"
          icon={<Dashboard className="menuIcon" />}
        />
        <SideBarMenu
          link="/transactions"
          title="All Transactions"
          icon={<Receipt className="menuIcon" />}
        />
        <SideBarMenu
          link="/target"
          title="Set Limit"
          icon={<CurrencyRupee className="menuIcon" />}
        />
      </Box>
    </div>
  );
};

export default SideBar;

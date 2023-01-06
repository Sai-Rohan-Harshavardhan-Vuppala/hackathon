import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import "../Style/sidebar.css";

const SideBarList = ({ bgColor, header, value }) => {
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
					}}
				></Box>
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

const SideBar = () => {
	const navigate = useNavigate();

	const SideBarMenu = () => {
		return (
			<Grid
				container
				spacing={2}
				onClick={() => navigate("/")}
				className="menuItem"
			>
				<Grid item>
					<Box
						sx={{ width: 30, height: 30, boxShadow: 10, borderWidth: 2 }}
					></Box>
				</Grid>
				<Grid item className="centerAlign" xs={6}>
					<Typography variant="button">Dashboard</Typography>
				</Grid>
			</Grid>
		);
	};
	return (
		<div className="sidebar">
			<Box>
				<Grid container spacing={2} className="sidebar__title">
					<Grid item>
						<img
							src="https://cdn3d.iconscout.com/3d/premium/thumb/expenses-calculation-6482746-5373624.png"
							width={70}
							height={70}
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
			<SideBarList bgColor="lightblue" header="TOTAL EXPENSE" value="10,000" />
			<SideBarList bgColor="red" header="MONTHLY ALLOWANCE" value="15,000" />
			<Box mt={4} px={3}>
				<SideBarMenu />
			</Box>
		</div>
	);
};

export default SideBar;

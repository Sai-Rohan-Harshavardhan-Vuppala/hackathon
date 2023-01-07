import React, { useState } from "react";
import { Box, Button, Card, Paper, Typography } from "@mui/material";
import "../Style/dashboard.css";
import BarGraph from "./Graphs/BarGraph";
import PieChart from "./Graphs/PieChart";
import DoughnutChart from "./Graphs/Doughnut";

const doughColor = {
	"Daily Expenses": "rgb(219, 72, 178)",
	"Monthly Expenses": "rgb(255, 99, 132)",
	"Weekly Expenses": "rgb(255, 159, 64)",
};

const InfoCards = ({ title, value, dataA = 0, dataB = 0 }) => {
	return (
		<Paper elevation={5} sx={{ alignItems: "center", display: "flex" }} className="infoCards">
			<Card
				variant="outlined"
				sx={{
					padding: 1,
					paddingLeft: 2,
					paddingRight: 2,
					display: "flex",
					border: "none",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box>
					<Typography
						variant="caption"
						sx={{ fontWeight: 600, fontSize: 15, color: "rgba(0,0,0,0.6)" }}
					>
						{title}
					</Typography>
					<Typography variant="h5" sx={{ fontWeight: 600 }}>
						{value}
					</Typography>
				</Box>
				{(dataA !== 0 || dataB !== 0) && (
					<Box sx={{ width: 75 }}>
						<DoughnutChart
							dataA={dataA}
							dataB={dataB}
							bgColor={doughColor[title]}
						/>
					</Box>
				)}
			</Card>
		</Paper>
	);
};

const Dashboard = ({user}) => {
	const [barType, setBarType] = useState("monthly");

	const handleBarTypeChange = (newBarType) => {
		setBarType(newBarType);
	};

	const BarTypeButton = ({ value, title }) => {
		return (
			<Button
				component="div"
				className={`barButton ${barType === value ? "barButtonSelected" : ""}`}
				onClick={() => handleBarTypeChange(value)}
			>
				{title}
			</Button>
		);
	};

	return (
		<Box>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<InfoCards title="Daily Average" value="₹ 34" />
				<InfoCards title="Weekly Average" value="₹ 300" />
				<InfoCards title="Daily Expenses" value="₹ 34" dataA={30} dataB={100} />
				<InfoCards
					title="Weekly Expenses"
					value="₹ 450"
					dataA={30}
					dataB={100}
				/>
				<InfoCards
					title="Monthly Expenses"
					value="₹ 10,000"
					dataA={30}
					dataB={100}
				/>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Paper
					sx={{ marginTop: 4, paddingTop: 1, paddingBottom: 1 }}
					elevation={5}
				>
					<Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={1}>
						<BarTypeButton value="monthly" title="Monthly" />
						<BarTypeButton value="weekly" title="Weekly" />
						<BarTypeButton value="daily" title="Daily" />
					</Box>
					<BarGraph invoiceData={user.invoices} />
				</Paper>
				<Paper
					sx={{ marginTop: 4, paddingTop: 1, paddingBottom: 1 }}
					elevation={5}
					className="centerAlign"
				>
					<PieChart invoiceData={user.invoices} />
				</Paper>
			</Box>
		</Box>
	);
};

export default Dashboard;

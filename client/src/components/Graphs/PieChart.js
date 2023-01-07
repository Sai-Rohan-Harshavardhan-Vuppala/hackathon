import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box } from "@mui/material";

const PieChart = ({invoiceData}) => {
	ChartJS.register(ArcElement, Tooltip, Legend);
	
	// group invoiceData items by items.category
	const groupedItems = invoiceData.reduce((acc, invoice) => {
		invoice.items.forEach((item) => {
			if (!acc[item.category]) {
				acc[item.category] = [item];
			}else{
				acc[item.category].push(item);
			}
		});
		return acc;
	}, {});

	console.log({groupedItems, invoiceData});
	
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
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
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
		<Box sx={{ width: "32vw", height: "40vh" }} className="centerAlign">
			<Pie data={data} />
		</Box>
	);
};

export default PieChart;

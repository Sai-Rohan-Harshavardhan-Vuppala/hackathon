import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const BarGraph = () => {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);
	const currentMonth = new Date().getMonth();
	const labels = [];
	for (let i = currentMonth, j = 0; j < 12; j++) {
		labels.push(months[i]);
		i--;
		if (i < 0) i = 11;
	}
	labels.reverse();

	const options = {
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
		},
	};

	const data = {
		labels,
		datasets: [
			{
				data: [0,0,0,100, 20, 30, 23, 150, 70, 50],
				backgroundColor: "rgba(255, 99, 132, 0.6)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
				barThickness: 25,
				borderRadius: 5,
			},
		],
	};

	return (
		<Box
			sx={{ display: "flex", height: "40vh", width: "40vw" }}
			className="centerAlign"
			mx={2}
		>
			<Bar options={options} data={data} />
		</Box>
	);
};

export default BarGraph;

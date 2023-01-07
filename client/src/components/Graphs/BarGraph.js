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

const daily = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun",
];

const BarGraph = ({invoiceData, type}) => {
	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);

	console.log({invoiceData});

	const getMonthLabels = () => {
		const currentMonth = new Date().getMonth();
		const labels = [];
		for (let i = currentMonth, j = 0; j < 12; j++) {
			labels.push(months[i]);
			i--;
			if (i < 0) i = 11;
		}
		labels.reverse();
		return labels;
	};

	const getWeekLabels = () => {
		return ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10"];
	};

	const getDailyLabels = () => {
		let currentDay = new Date().getDay() - 1;
		if(currentDay < 0) currentDay = 6;
		const labels = [];
		for (let i = currentDay, j = 0; j < 10; j++) {
			labels.push(daily[i]);
			i--;
			if (i < 0) i = 6;
		}
		labels.reverse();
		return labels;
	};

	const getMonthData = (labels) => {
		const data = invoiceData.reduce((acc, invoice) => {
			if (new Date().getTime() - new Date(invoice.date).getTime() > 31536000000) {
				return acc;
			}
			const month = months[new Date(invoice.date).getMonth()];
			if (!acc[month]) {
				acc[month] = invoice.items.reduce((tot, item) => tot + item.value, 0);
			} else {
				acc[month] += invoice.items.reduce((tot, item) => tot + item.value, 0);
			}
			return acc;
		}, {});

		labels.forEach((label) => {
			if (!data[label]) {
				data[label] = 0;
			}
		});
		console.log({data});
		return data;
	};

	// const getWeekData = (labels) => {
	// 	// sort object invoiceData by date key
	// 	const sortedData = invoiceData.sort((a, b) => {
	// 		return new Date(b.date) - new Date(a.date);
	// 	});

	// 	// get the date of previous monday
	// 	let prevMon = new Date(sortedData[0].date).getDay() - 1;
	// 	if(prevMon === -1) prevMon = 6;

	// 	// date of sortedData[0] - prevMon
	// 	const firstMon = new Date(sortedData[0].date);
	// 	firstMon.setDate(firstMon.getDate() - prevMon - 63);



	// 	console.log({sortedData});
	// }

	const getDailyData = (labels) => {
		const sortedData = invoiceData.sort((a, b) => {
			return new Date(b.date) - new Date(a.date);
		});

		const limDate = new Date(sortedData[0].date);
		console.log(new Date(sortedData[0].date));
		limDate.setDate(limDate.getDate() - 9);

		console.log({limDate});

		const data = sortedData.reduce((acc, invoice) => {
			if(new Date(invoice.date).getTime() < limDate.getTime()) return acc;
			console.log(invoice.date);
			let temp = new Date(invoice.date).getDay() - 1;
			if(temp === -1) temp = 6;
			const day = daily[temp];
			if (!acc[day]) {
				acc[day] = invoice.items.reduce((tot, item) => tot + item.value, 0);
			} else {
				acc[day] += invoice.items.reduce((tot, item) => tot + item.value, 0);
			}
			return acc;
		}, {});

		labels.forEach((label) => {
			if (!data[label]) {
				data[label] = 0;
			}
		});
		console.log({data});
		return data;
	};

	let labels = [];
	if (type === "monthly") {
		labels = getMonthLabels();
	} else if (type === "weekly") {
		labels = getWeekLabels();
	} else if (type === "daily") {
		labels = getDailyLabels();
	}

	let Invdata = [];
	if (type === "monthly") {
		Invdata = getMonthData(labels);
	} else if (type === "weekly") {
		Invdata = Object.values(getDailyData(labels));
	} else if (type === "daily") {
		Invdata = getDailyData(labels);
	}

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
				data: Invdata,
				backgroundColor: "rgba(255, 99, 132, 0.6)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
				borderRadius: 3,
			},
		],
	};

	return (
		<Box
			sx={{ display: "flex", height: "40vh", width: "40vw" }}
			className="centerAlign"
			mx={2}
		>
			<Bar options={options} data={data} redraw={false} />
		</Box>
	);
};

export default BarGraph;

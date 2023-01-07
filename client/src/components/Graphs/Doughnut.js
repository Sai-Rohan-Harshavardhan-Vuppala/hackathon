import React from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ dataA, dataB, bgColor }) => {
	ChartJS.register(ArcElement);

	const data = {
		labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
		datasets: [
			{
				label: "# of Votes",
				data: [dataA, dataB],
				backgroundColor: [bgColor, "rgba(0,0,0, 0.1)"],
				borderColor: [bgColor, "rgba(0,0,0,0.1)"],
				borderWidth: 1,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
			label: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
		},
	};

	return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;

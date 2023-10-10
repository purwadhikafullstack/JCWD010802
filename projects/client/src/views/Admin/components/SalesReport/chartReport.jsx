import { Flex } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export const ChartReport = ({ chart }) => {
  if (!chart || chart.length === 0) {
    return <div>No data available.</div>;
  }
  const dateParam = chart[0].orderDate;

  const currentDate = new Date(dateParam || new Date()); 
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const labels = [];
  const currentDateIter = new Date(firstDayOfMonth);
  while (currentDateIter <= lastDayOfMonth) {
    labels.push(currentDateIter.toISOString().split("T")[0]); 
    currentDateIter.setDate(currentDateIter.getDate() + 1); 
  }
  const productNames = [
    ...new Set(
      chart.flatMap((data) => data.products.map((product) => product.name))
    ),
  ];
  const dataByDate = {};
  chart.forEach((data) => {
    const dateStr = data.orderDate;
    dataByDate[dateStr] = dataByDate[dateStr] || {};
    data.products.forEach((product) => {
      dataByDate[dateStr][product.name] = product.price;
    });
  });
  labels.forEach((date) => {
    if (!dataByDate[date]) {
      dataByDate[date] = {};
      productNames.forEach((productName) => {
        dataByDate[date][productName] = 0;
      });
    }
  });
  const productsData = productNames.map((productName) => {
    return {
      label: productName,
      data: labels.map((date) => dataByDate[date][productName]),
      borderColor: getRandomColor(),
      fill: false,
      tension: 0.2,
    };
  });

  const dataChart = {
    labels,
    datasets: productsData,
  };

  return (
    <Flex w={"full"}>
      <Line data={dataChart} />
    </Flex>
  );
};

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

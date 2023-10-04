import { Flex } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export const ChartReport = ({ salesCat }) => {
  if (!salesCat || salesCat.length === 0) {
    return <div>No data available.</div>;
  }
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const categoryIds = [
    ...new Set(
      salesCat.flatMap((monthData) => Object.keys(monthData.categorySales))
    ),
  ];
  const months = salesCat.map((monthData) => monthNames[monthData.month - 1]);

  const datasets = categoryIds.map((categoryId, index) => {
    const color = getRandomColor();

    let categoryName = `Category ${categoryId}`;

    for (const monthData of salesCat) {
      const categorySales = monthData?.categorySales[categoryId];
      if (categorySales) {
        categoryName = categorySales.productName;
        break;
      }
    }

    const categorySalesData = salesCat.map((monthData) => {
      const categorySales = monthData?.categorySales[categoryId];
      return categorySales ? categorySales.totalSales : 0;
    });

    return {
      label: categoryName,
      backgroundColor: color,
      borderColor: color,
      data: categorySalesData,
      tension: 0.2
    };
  });

  const dataChart = {
    labels: months,
    datasets: datasets,
  };

  return (
    <Flex w={"50vw"}>
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

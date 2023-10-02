import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const monthly = [
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

export const ProductReport = () => {
  const [sales, setSales] = useState();
  const getSales = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sales/product`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSales(response.data.monthlyTotal);
      console.log(response.data.monthlyTotal);
    } catch (error) {
      console.log(error);
    }
  };
  const dataChart = {
    labels: monthly,
    datasets: [
      {
        label: "Product sales report",
        backgroundColor: "#fff",
        borderColor: "rgba(0,0,0)",
        data: monthly.map((monthName) => {
          const monthYear = `2023-${
            monthly.indexOf(monthName) + 1 < 10 ? "0" : ""
          }${monthly.indexOf(monthName) + 1}`;
          const monthData = sales?.find((v) => v.monthYear === monthYear);
          return monthData ? monthData.total : 0;
        }),
      },
    ],
  };
  useEffect(() => {
    getSales();
  }, []);
  return (
    <>
      <Line data={dataChart} />
    </>
  );
};

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

export const CategoryReport = () => {
  const [sales, setSales] = useState();
  const getSales = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sales/category`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSales(response.data.monthlyTotal);
      // console.log(response.data.monthlyTotal);
    } catch (error) {
      console.log(error);
    }
  };
  const dataChart = {
    labels: monthly,
    datasets: [
      {
        label: "Category sales report",
        backgroundColor: "#32a852",
        borderColor: "rgba(50, 168, 82)",
        data: monthly.map((monthName) => {
          const monthData = sales?.find(
            (v) => v.month === monthly.indexOf(monthName) + 1
          );
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

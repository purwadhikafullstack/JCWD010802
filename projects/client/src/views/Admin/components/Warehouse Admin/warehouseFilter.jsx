import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";

export const WarehouseFilter = ({ onChange }) => {
  const [warehouse, setWarehouse] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState("");

  
  const getWarehouse = async () => {
      try {
          const response = await axios.get(`/warehouse`);
          console.log(response);
          setWarehouse(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        setSelectedWarehouseId(selectedId);
        onChange(selectedId);
    };
    useEffect(() => {
      getWarehouse();
    }, []);

  return (
    <div>
      <label htmlFor="warehouseSelect">Filter by Warehouse:</label>
      <select
        id="warehouseSelect"
        value={selectedWarehouseId}
        onChange={handleSelectChange}
      >
        <option value="">Select a warehouse</option>
        {warehouse.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>
            {warehouse.name}
          </option>
        ))}
      </select>
    </div>
  );
};


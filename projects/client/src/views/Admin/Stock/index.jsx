import React, { useEffect, useState } from "react";
import axios from "axios";
import {Button,Flex,Box,Heading,Text,VStack,Card,Image, Select,} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WarehouseStockList } from "../components/Stock/listWarehouseStock";


export const StockView = () => {
    return (
        <>
        <WarehouseStockList />
        </>
    )
}
import React from "react"; 
import { useSelector } from "react-redux";
import { Sidebar } from "./components/sidebar";
import { NotFound } from "../../pages/Error";

export const AdminpageView = () => {
  const user = useSelector((state) => state.user.value);


  if (user.roleId === 2 || user.roleId === 3) {
    return <Sidebar />;
  } else {
    return <NotFound />;
  }
};

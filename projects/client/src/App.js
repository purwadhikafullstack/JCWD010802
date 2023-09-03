import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { useDispatch } from "react-redux";
import { setValue } from "./redux/userSlice";

function App() {
  const router = createBrowserRouter(routes);
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()

  const keepLogin = async () => {
    if (token) {
      const response = await axios.get("http://localhost:8000/api/auth/keeplogin", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(setValue(response.data.result))
    } else {
      
    }
  }

  useEffect(() => {
    keepLogin()
  }, [])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

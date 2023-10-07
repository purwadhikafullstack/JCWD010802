import "./App.css";
import axios from "./api/axios";
import headersGen from "./api/headers";
import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { useDispatch } from "react-redux";
import { setValue } from "./redux/userSlice";
import { setCart,setCartId } from "./redux/cartSlice";
import { setPrice } from "./redux/totalPrice";

function App() {
  const router = createBrowserRouter(routes);
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const headers = headersGen(token)

  const keepLogin = async () => {
    if (token) {
      const response = await axios.get("/auth/keeplogin", { headers })
      console.log(response);
      dispatch(setValue(response.data.result))
    } else {
      localStorage.removeItem("token")
    }
  }
  const userCart = async()=>{
    try {
      const response = await axios.get(`http://localhost:8000/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCart(response.data.result))
      dispatch(setCartId(response.data.Cart.id))
      dispatch(setPrice(response.data.Cart.totalPrice))

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    keepLogin()
    userCart()
  }, [])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

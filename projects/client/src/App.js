import axios from "axios";
import "./App.css";
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


  const keepLogin = async () => {
    try {
      if (token) {
        const response = await axios.get("http://localhost:8000/api/auth/keeplogin", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch(setValue(response.data.result))
      } 
    } catch (error) {
      console.log(error);
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

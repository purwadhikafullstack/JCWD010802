import { Flex } from "@chakra-ui/react"
import { Carousel } from "./components/Carousel"
import { TopProduct } from "./components/TopProduct"
import { NewProduct } from "./components/NewProduct"
import { Category } from "./components/Category"
import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { CarouselLoading } from "./components/CarouselLoading"
import { toast } from "react-toastify"

export const HomepageView = () => {
  const [category, setCategory] = useState()
  const [topProduct, setTopProduct] = useState()
  const [newProduct, setNewProduct] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  const getCategory = async () => {
    try {
        const response = await axios.get("/category?limit=7")
        setCategory(response.data.result)
    } catch (error) {
        console.log(error);
        toast.error("Failed to load categories!")
    }
  }
  const getTopProduct = async () => {
    try {
        const response = await axios.get("/product?sort=za&limit=8")
        setTopProduct(response.data.result)
      } catch (error) {
        console.log(error);
        toast.error("Failed to load top products!")
    }
  }
  const getNewProduct = async () => {
    try {
        const response = await axios.get("/product?limit=8")
        setNewProduct(response.data.result)
      } catch (error) {
        console.log(error);
        toast.error("Failed to load new products!")
    }
  }
  useEffect(() => {
    getCategory()
    getTopProduct()
    getNewProduct()
  },[isLoaded])
  useEffect(() => {
    if (category?.length > 0 && topProduct?.length > 0 && newProduct?.length > 0) {
        setIsLoaded(true);
    }
}, [category, topProduct, newProduct]);
  return (
    <Flex bg="#edf3f8" minH="100vh" direction="column" pt="80px" alignItems="center">
      {isLoaded ? <Carousel isLoaded={isLoaded} /> : <CarouselLoading />}
      <Category data={category} isLoaded={isLoaded} />
      <NewProduct data={newProduct} isLoaded={isLoaded} />
      <TopProduct data={topProduct} isLoaded={isLoaded} />
    </Flex>
  )
}

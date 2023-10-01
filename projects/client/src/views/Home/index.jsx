import { Flex } from "@chakra-ui/react"
import { Carousel } from "./components/Carousel"
import { TopProduct } from "./components/TopProduct"
import { NewProduct } from "./components/NewProduct"
import { Category } from "./components/Category"
import { Suspense, lazy } from "react"


export const HomepageView = () => {
  const Loading = lazy(() => import('../Loading/HomeLoading'))
  return (
    <Suspense fallback={<Loading />}>
      <Flex bg="#edf3f8" minH="100vh" direction="column" pt="80px" alignItems="center">
        <Carousel />
        <Category />
        <NewProduct />
        <TopProduct />
      </Flex>
    </Suspense>
  )
}

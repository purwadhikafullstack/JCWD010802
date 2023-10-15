import { Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import headersGen from "../../../api/headers";

export const Carousel = ({ isLoaded }) => {
  const [slides, setSlides] = useState()
  const token = localStorage.getItem("token")
  const headers = headersGen(token)

  const getSlides = async () => {
    try {
      const response = await axios.get("/banner", { headers })
      setSlides(response.data.result)
    } catch (error) {
      console.log(error);
    }
  }
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides?.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  // Add an effect to automatically transition to the next slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change the interval duration as needed (e.g., 5000ms for 5 seconds)
    
    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    getSlides()
  },[])

  return (
    <Flex
    w="full"
    bg="#edf3f8"
    alignItems="center"
    justifyContent="center"
    px={{ base: "20px", lg: "50px" }}
    py="20px"
    pos="relative"
    >
        <Skeleton isLoaded={isLoaded}>
        <Flex
          w="full"
          maxW="1200px"
          borderRadius="10px"
          shadow="md"
          h={{ base: "200px", lg: "400px" }}
          fontSize="0"
          overflow="hidden"
          pos="relative"
        >
          <Flex
            transform={`translateX(-${currentSlide * 100}%)`}
            transition="transform 0.5s ease"
            w={`${slidesCount * 100}%`}
          >
            {slides?.map((slide, sid) => (
              <Box
                key={`slide-${sid}`}
                boxSize="full"
                shadow="md"
                flex="none"
                w="100%"
              >
                <Image
                  src={`${process.env.REACT_APP_BASE_URL}/bannerImg/${slide?.bannerImg}`}
                  alt="carousel image"
                  boxSize="full"
                  objectFit="cover"
                />
              </Box>
            ))}
          </Flex>
          <Text {...arrowStyles} left="0" onClick={prevSlide}>
            &#10094;
          </Text>
          <Text {...arrowStyles} right="0" onClick={nextSlide}>
            &#10095;
          </Text>
        </Flex>
      </Skeleton>
    </Flex>
  );
};

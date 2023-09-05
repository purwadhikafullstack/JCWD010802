import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";


export const Carousel = () => {
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
      transition: "0.6s ease",
      borderRadius: "0 3px 3px 0",
      userSelect: "none",
      _hover: {
        opacity: 0.8,
        bg: "black",
      },
    };
    const slides = [
      {
        img: "https://images.pexels.com/photos/2599537/pexels-photo-2599537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      {
        img: "https://images.pexels.com/photos/2714581/pexels-photo-2714581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      {
        img: "https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      },
      {
        img: "https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      {
        img: "https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
    ];
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = slides.length;
  
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };
  
    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };
  
    const carouselStyle = {
      transition: "all .5s",
      ml: `-${currentSlide * 100}%`,
    };
    return (
      <Flex
        w="full"
        bg="#edf3f8"
        alignItems="center"
        justifyContent="center"
        px={{base: "20px", lg: "50px"}}
        py="20px"
      >
        <Flex w="full" overflow="hidden" pos="relative" maxW="1400px" borderRadius="10px" shadow="md">
          <Flex h={{base: "200px", lg: "300px"}}  {...carouselStyle}>
            {slides.map((slide, sid) => (
              <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
                <Text
                  color="white"
                  fontSize="xs"
                  p="8px 12px"
                  pos="absolute"
                  top="0"
                >
                  {sid + 1} / {slidesCount}
                </Text>
                <Image
                  src={slide.img}
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
      </Flex>
    );
  };
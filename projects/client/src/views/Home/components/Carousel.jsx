import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

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
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };
  const slides = [
    {
      img: "https://i.postimg.cc/WpCRzjKm/Blue-Dynamic-Fashion-Special-Sale-Banner.png",
    },
    {
      img: "https://i.postimg.cc/y6yHf2r0/Green-and-Peach-Modern-Dots-The-Latest-Gadget-Available-Banner.png",
    },
    {
      img: "https://i.postimg.cc/WbFxwfqS/big-sale-discounts-products.jpg",
    },
    {
      img: "https://i.postimg.cc/kGzJh6yH/7995902.jpg",
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

  // Add an effect to automatically transition to the next slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change the interval duration as needed (e.g., 5000ms for 5 seconds)
    
    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentSlide]);

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
      <Flex
        w="full"
        maxW="1400px"
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
          {slides.map((slide, sid) => (
            <Box
              key={`slide-${sid}`}
              boxSize="full"
              shadow="md"
              flex="none"
              w="100%"
            >
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

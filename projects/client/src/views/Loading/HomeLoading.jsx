import { Avatar, Box, Flex, Text, keyframes } from '@chakra-ui/react'

export const HomeLoading = () => {
  const size = '300px'
  const color = '#9FD8CB'

  const pulseRing = keyframes`
	0% {
    transform: scale(0.5);
    }
    40%,
    50% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
	`

  return (
    <Flex h="100vh" bg="#edf3f8" justifyContent="center" alignContent="center">
        <Flex
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        w="full"
        direction="column"
        >
            {/* Ideally, only the box should be used. The <Flex /> is used to style the preview. */}
            <Box
                as="div"
                position="relative"
                w={size}
                h={size}
                _before={{
                content: "''",
                position: 'relative',
                display: 'block',
                width: '400%',
                height: '400%',
                boxSizing: 'border-box',
                marginLeft: '-150%',
                marginTop: '-150%',
                borderRadius: '50%',
                bgColor: color,
                animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
                }}>
                <Avatar src="https://i.postimg.cc/mkyXdyD8/TECHTOK-ID-removebg-preview.png" size="full" position="absolute" top={0} />
            </Box>
            <Text fontSize="18px" color="#517664" zIndex={999}>Please wait, we are directing you to our page</Text>
        </Flex>
    </Flex>
  )
}
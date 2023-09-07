import { Button } from '@chakra-ui/react'

export const ButtomTemp = ({content, func}) => {
  return (
        <Button
        colorScheme={"facebook"}
        bgGradient="linear(to-r, blackAlpha.400, blackAlpha.500, blackAlpha.600)"
        color={'white'}
        onClick={func}
        >
        {content}
        </Button>
  )
}
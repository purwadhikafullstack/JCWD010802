import { Button } from '@chakra-ui/react'

export const ButtomTemp = ({content, func}) => {
  return (
        <Button
        bg={'#517664'}
        color={'white'}
        onClick={func}
        _hover={{ bg: "#2d3319" }}
        >
        {content}
        </Button>
  )
}
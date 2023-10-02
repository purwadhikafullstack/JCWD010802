import { Button } from '@chakra-ui/react'

export const ButtomTemp = ({content, func}) => {
  return (
        <Button
        bg="#517664" mb={3} color={"white"} _hover={{bg:"#2d3319"}}
       
        onClick={func}
        >
        {content}
        </Button>
  )
}
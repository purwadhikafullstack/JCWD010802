import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
  Box,
  color,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DetailOrder } from "./modal/modalOrder/DetailOrder";
import { CancelOrder } from "./modal/modalOrder/CancelOrder";
import { PaymentProof } from "./modal/modalOrder/PaymentProof";
import { ConfirmOrder } from "./modal/modalOrder/ConfirmOrder";

export const ButtonOrderOption = ({ data, reload }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isConfrimModalOpen, setIsConfrimModalOpen] = useState(false);

  const handleDetailClick = () => {
    setIsModalOpen(true);
  };
  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };
  const handlePaymentClick = () => {
    setIsPaymentModalOpen(true)
  }
  const handleConfirmClick = () => {
    setIsConfrimModalOpen(true)
  }
  return (
    <Box>
      <Flex justifyContent="center" alignItems="flex-start">
        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
            <IconButton
              aria-label="More server options"
              icon={<BsThreeDotsVertical color="black"/>}
              variant="solid"
              w="fit-content"
              size="xs"
              bg="white"
            />
          </PopoverTrigger>
          <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
            <PopoverArrow />
            <PopoverBody>
              <Stack>
                <Button
                  variant="ghost"
                  fontWeight="normal"
                  fontSize="sm"
                  onClick={handleDetailClick}
                >
                  Detail
                </Button>
                {data?.statusId === 1 ?
                <Button
                variant="ghost"
                fontWeight="normal"
                colorScheme="red"
                fontSize="sm"
                onClick={handleCancelClick}
                >
                    Cancel
                </Button> : null}
                {data?.statusId === 1 ? 
                <Button
                variant="ghost"
                fontWeight="normal"
                colorScheme="green"
                fontSize="sm"
                onClick={handlePaymentClick}
                >
                    Upload Payment
                </Button> : null}
                {data?.statusId === 4 ?
                <Button
                variant="ghost"
                fontWeight="normal"
                colorScheme="green"
                fontSize="sm"
                onClick={handleConfirmClick}
                >
                    Confirm
                </Button> : null}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <DetailOrder 
      isOpen={isModalOpen} 
      data={data}
      onClose={() => setIsModalOpen(false)}
      />
      <CancelOrder 
      isOpen={isCancelModalOpen}
      onClose={() => setIsCancelModalOpen(false)}
      reload={reload}
      id={data?.id}
      />
      <PaymentProof
      isOpen={isPaymentModalOpen}
      onClose={() => setIsPaymentModalOpen(false)}
      reload={reload}
      id={data?.id}
      />
      <ConfirmOrder 
      isOpen={isConfrimModalOpen}
      onClose={() => setIsConfrimModalOpen(false)}
      reload={reload}
      id={data?.id}
      />
    </Box>
  );
};

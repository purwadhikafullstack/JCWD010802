import React from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#517664",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Flex direction="column" alignItems="center">
        <Spinner color="white" size="xl" thickness="4px" />
        <Text style={{ marginTop: "10px", color: "white" }}>Loading...</Text>
      </Flex>
    </motion.div>
  );
};

export default LoadingScreen;

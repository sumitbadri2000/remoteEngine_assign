import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box p={4} bg={"blue.500"}>
      <Flex alignItems="center" gap={"10%"}>
        <Heading as="h1" size="md" color="white">
          <a href="/">remoteEngine</a>
        </Heading>
        <Flex justifyContent={"space-around"} color={"white"} width={"40%"}>
          <a href="/onboarding">Onboarding</a>
          <a href="/addForm">Add Form</a>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

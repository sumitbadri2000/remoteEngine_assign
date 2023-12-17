import { Heading, Center } from "@chakra-ui/react";
import Navbar from "./Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <Center width={"30%"} m="auto" mt={6} textAlign={"center"}>
        <Heading>Welcome to Our Website</Heading>
      </Center>
      <Heading textAlign={"center"} mt={6}>
        Add Onboarding form and see all other Onboarding forms.
      </Heading>
    </>
  );
}

export default Home;

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../redux/auth/auth.action";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = () => {
    let obj = {
      name,
      email,
      password,
    };
    if (obj.name === "" || obj.password === "" || obj.email === "") {
      toast({
        title: "Please fill add details",
        status: "error",
        duration: 500,
        isClosable: true,
        position: "top",
      });
    } else {
      dispatch(authRegister(obj));
    }
  };
  useEffect(() => {
    if (authState.userRegister.message === "User already exist, Please login") {
      toast({
        title: authState.userRegister.message,

        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    if (authState.userRegister.message === "Something Went Wrong") {
      toast({
        title: "Wrong Details",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    if (authState.userRegister.message === "User Registration Suceessful") {
      toast({
        title: authState.userRegister.message,
        description: "Please Login to Continue",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [authState?.userRegister?.message]);
  if (authState.data.isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  // console.log(authState.userRegister.message);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="Name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleRegister}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to="/login" color={"blue.400"}>
                  <Box as="span" color={"blue"}>
                    Login
                  </Box>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

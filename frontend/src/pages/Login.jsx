import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../redux/auth/auth.action";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authState = useSelector((state) => state.auth);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      authState.userLogin.message ===
      "User is not registered, Please register first"
    ) {
      toast({
        title: authState.userLogin.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    if (authState.userLogin.message === "Something Went Wrong") {
      toast({
        title: "Wrong Password",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    if (authState.userLogin.message === "Login Successful") {
      toast({
        title: "Login Successful",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [dispatch, navigate, authState, toast]);

  const handleUserLogin = () => {
    let obj = {
      email,
      password,
    };
    dispatch(authLogin(obj));
  };

  if (authState.data.isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <Text as="span" color={"blue.400"}>
              features ✌️
            </Text>
          </Text>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
            <Stack spacing={4}>
              <Checkbox>Remember me</Checkbox>
              <Text color={"blue.400"} fontSize="sm">
                <Link to="/forgot-password">Forgot password?</Link>
              </Text>
            </Stack>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleUserLogin}
              size="lg">
              Sign in
            </Button>
          </Stack>
          <Text align={"center"} mt={4} fontSize="sm" color="gray.500">
            Don't have an account?{" "}
            <Link to="/signup" color={"blue.400"}>
              Signup
            </Link>
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
}

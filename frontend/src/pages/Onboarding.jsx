import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Tag,
  TagLabel,
  Badge,
  Spinner,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "./Navbar";

const Onboarding = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://remote-backend.vercel.app/form"
        );
        setData(response.data.developers);
        console.log(response.data.developers);
      } catch (error) {
        console.error("Error fetching onboarding data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Box>
        <Center as="h1" size="lg" color="white" mb={6} bg={"blue"} p={4}>
          <Heading>Developer Onboarding Data</Heading>
        </Center>
        <Flex align="center" alignItems={"center"}>
          {loading ? (
            <Spinner mt={4} />
          ) : data && data.length > 0 ? (
            <Flex width={"80%"} m={"auto"} gap={10} flexWrap={"wrap"}>
              {data.map((developer, index) => (
                <Flex key={index} gap={12}>
                  <Box p={4} borderWidth="1px" borderRadius="md">
                    <Heading as="h2" size="md" mb={2}>
                      {developer.firstName} {developer.lastName}
                    </Heading>
                    <Text fontSize="sm" color="gray.500" mb={4}>
                      Phone Number: {developer.phoneNumber}
                    </Text>
                    <Text fontSize="sm" color="gray.500" mb={4}>
                      {developer.email}
                    </Text>
                    <VStack align="start" spacing={4}>
                      <Badge colorScheme="teal">Professional Experiences</Badge>
                      {developer.professionalExperience.map(
                        (professional, expIndex) => (
                          <>
                            <Flex gap={4}>
                              <Text>Company Name</Text>
                              <Tag size="sm" variant="solid" colorScheme="blue">
                                <TagLabel>{professional.companyName}</TagLabel>
                              </Tag>
                            </Flex>

                            <Box key={expIndex}>
                              <Flex gap={4} mb={4}>
                                <Text>TechStack</Text>
                                {professional.techStack.map((tech, i) => (
                                  <Tag
                                    key={i}
                                    size="sm"
                                    variant="solid"
                                    colorScheme="blue"
                                    ml={2}>
                                    <TagLabel>{tech}</TagLabel>
                                  </Tag>
                                ))}
                              </Flex>
                              <Flex gap={2} mb={4}>
                                <Text>Skill</Text>
                                {professional.skillsUsed.map((skills, i) => (
                                  <Tag
                                    key={i}
                                    size="sm"
                                    variant="solid"
                                    colorScheme="blue"
                                    ml={2}>
                                    <TagLabel>{skills}</TagLabel>
                                  </Tag>
                                ))}
                              </Flex>
                              <Flex>
                                <Text>TimePeriod</Text>
                                <Tag
                                  size="sm"
                                  variant="solid"
                                  colorScheme="blue"
                                  ml={2}>
                                  <TagLabel>{professional.timePeriod}</TagLabel>
                                </Tag>
                              </Flex>
                            </Box>
                          </>
                        )
                      )}
                    </VStack>
                    <VStack align="start" spacing={4} mt={4}>
                      <Badge colorScheme="teal">Education Experiences</Badge>
                      {developer.educationExperience.map(
                        (education, expIndex) => (
                          <Box key={expIndex}>
                            <Tag size="sm" variant="solid" colorScheme="blue">
                              <TagLabel>{education.degreeName}</TagLabel>
                            </Tag>
                            <Tag
                              size="sm"
                              variant="solid"
                              colorScheme="blue"
                              ml={2}>
                              <TagLabel>{education.schoolName}</TagLabel>
                            </Tag>
                            <Tag
                              size="sm"
                              variant="solid"
                              colorScheme="blue"
                              ml={2}>
                              <TagLabel>{education.timePeriod}</TagLabel>
                            </Tag>
                          </Box>
                        )
                      )}
                    </VStack>
                  </Box>
                </Flex>
              ))}
            </Flex>
          ) : (
            <Text color="white">No data available.</Text>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Onboarding;

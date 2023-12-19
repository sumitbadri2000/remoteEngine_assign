import { useState } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import axios from "axios";

export default function AddForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    professionalExperiences: [
      { companyName: "", techStack: [], skillsUsed: [], timePeriod: "" },
    ],
    educationExperiences: [{ degreeName: "", schoolName: "", timePeriod: "" }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await axios.post(
        "https://remote-backend.vercel.app/form/add",
        formData
      );
      console.log("Response from server:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    window.location.replace("/addForm");
  };

  const handleProfessionalChange = (index, field, value) => {
    const updatedExperiences = [...formData.professionalExperiences];
    if (field === "techStack" || field === "skillsUsed") {
      updatedExperiences[index][field] = [value];
    } else {
      updatedExperiences[index][field] = value;
    }
    setFormData({ ...formData, professionalExperiences: updatedExperiences });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedExperiences = [...formData.educationExperiences];
    updatedExperiences[index][field] = value;
    setFormData({ ...formData, educationExperiences: updatedExperiences });
  };

  return (
    <ChakraProvider>
      <Box>
        <Navbar />
        <form style={{ width: "60%", margin: "auto" }}>
          <Heading as="h2" textAlign="center">
            Developer Onboarding Form
          </Heading>

          <FormControl mt={4}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="email">Email</FormLabel>

            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormControl>

          {/* Professional Experiences */}
          <Box mt={6}>
            <Heading as="h3" mb={4}>
              Professional Experiences
            </Heading>

            {formData.professionalExperiences.map((experience, index) => (
              <Box key={index} mb={4}>
                <FormControl>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    value={experience.companyName}
                    onChange={(e) =>
                      handleProfessionalChange(
                        index,
                        "companyName",
                        e.target.value
                      )
                    }
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Tech Stack</FormLabel>
                  <Input
                    value={experience.techStack}
                    onChange={(e) =>
                      handleProfessionalChange(
                        index,
                        "techStack",
                        e.target.value
                      )
                    }
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Skills Used</FormLabel>
                  <Input
                    value={experience.skillsUsed}
                    onChange={(e) =>
                      handleProfessionalChange(
                        index,
                        "skillsUsed",
                        e.target.value
                      )
                    }
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Time Period</FormLabel>
                  <Input
                    value={experience.timePeriod}
                    onChange={(e) =>
                      handleProfessionalChange(
                        index,
                        "timePeriod",
                        e.target.value
                      )
                    }
                  />
                </FormControl>
              </Box>
            ))}

            <Button
              mt={4}
              colorScheme="teal"
              onClick={() =>
                setFormData({
                  ...formData,
                  professionalExperiences: [
                    ...formData.professionalExperiences,
                    {
                      companyName: "",
                      techStack: "",
                      skillsUsed: "",
                      timePeriod: "",
                    },
                  ],
                })
              }>
              Add Professional Experience
            </Button>
          </Box>

          {/* Education Experiences */}
          <Box mt={6}>
            <Heading as="h3" mb={4}>
              Education Experiences
            </Heading>

            {formData.educationExperiences.map((education, index) => (
              <Box key={index} mb={4}>
                <FormControl>
                  <FormLabel>Degree Name</FormLabel>
                  <Input
                    value={education.degreeName}
                    onChange={(e) =>
                      handleEducationChange(index, "degreeName", e.target.value)
                    }
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>School Name</FormLabel>
                  <Input
                    value={education.schoolName}
                    onChange={(e) =>
                      handleEducationChange(index, "schoolName", e.target.value)
                    }
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Time Period</FormLabel>
                  <Input
                    value={education.timePeriod}
                    onChange={(e) =>
                      handleEducationChange(index, "timePeriod", e.target.value)
                    }
                  />
                </FormControl>
              </Box>
            ))}

            <Button
              mt={4}
              colorScheme="teal"
              onClick={() =>
                setFormData({
                  ...formData,
                  educationExperiences: [
                    ...formData.educationExperiences,
                    { degreeName: "", schoolName: "", timePeriod: "" },
                  ],
                })
              }>
              Add Education Experience
            </Button>
          </Box>

          <Box mt={6} textAlign={"center"} mb={4}>
            <Button
              type="submit"
              colorScheme="teal"
              onClick={(e) => handleSubmit(e)}>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </ChakraProvider>
  );
}

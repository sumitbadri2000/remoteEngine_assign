import axios from "axios";
import { useState } from "react";

export default function Apps() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    professionalExperiences: [
      { companyName: "", techStack: [], skillsUsed: [], timePeriod: "" },
    ],
    educationExperiences: [{ degreeName: "", schoolName: "", timePeriod: "" }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      professionalExperiences: [
        {
          companyName: formData.professionalExperiences.companyName,
          techStack: formData.professionalExperiences.techStack,
          skillsUsed: formData.professionalExperiences.skillsUsed,
          timePeriod: formData.professionalExperiences.timePeriod,
        },
      ],
      educationExperiences: [
        {
          degreeName: formData.educationExperiences.degreeName,
          schoolName: formData.educationExperiences.schoolName,
          timePeriod: formData.educationExperiences.timePeriod,
        },
      ],
    };
    try {
      const response = await axios.post(
        "https://remote-backend.vercel.app/form/add",
        obj
      );
      console.log("Response from server:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form>
        <h2>Developer Onboarding Form</h2>

        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ firstName: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ lastName: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ phoneNumber: e.target.value })}
          />
        </div>

        {/* Professional Experiences */}
        <div>
          <h3>Professional Experiences</h3>

          <div>
            <label>Company Name</label>
            <input
              name="companyName"
              value={formData.professionalExperiences.companyName}
              onChange={(e) => setFormData({ companyName: e.target.value })}
            />

            <label>Tech Stack</label>
            <input
              name="techStack"
              value={formData.professionalExperiences.techStack}
              onChange={(e) => setFormData({ techStack: e.target.value })}
            />

            <label>Skills Used</label>
            <input
              name="skillsUsed"
              value={formData.professionalExperiences.skillsUsed}
              onChange={(e) => setFormData({ skillsUsed: e.target.value })}
            />

            <label>Time Period</label>
            <input
              name="timePeriod"
              value={formData.professionalExperiences.timePeriod}
              onChange={(e) => setFormData({ timePeriod: e.target.value })}
            />
          </div>
        </div>

        {/* Education Experiences */}
        <div>
          <h3>Education Experiences</h3>
          <div>
            <label>Degree Name</label>
            <input
              name="degreeName"
              value={formData.educationExperiences.degreeName}
              onChange={(e) => setFormData({ degreeName: e.target.value })}
            />

            <label>School Name</label>
            <input
              name="schoolName"
              value={formData.educationExperiences.schoolName}
              onChange={(e) => setFormData({ schoolName: e.target.value })}
            />

            <label>Time Period</label>
            <input
              name="timePeriod"
              value={formData.educationExperiences.timePeriod}
              onChange={(e) => setFormData({ timePeriod: e.target.value })}
            />
          </div>
        </div>

        <div>
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

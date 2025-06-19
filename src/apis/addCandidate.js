// apis/candidates.js
import api from "../axios";

export const addCandidateApi = async ({ formData, recruiterId, jobId }) => {
  const data = new FormData();

  data.append("email", formData.email);
  data.append("phone", formData.phone);
  data.append("name", formData.name);
  data.append("location", formData.location);
  data.append("yearsOfExperience", formData.yearsOfExperience);
  data.append("aboutMe", formData.aboutMe);
  data.append("careerObjectives", formData.careerObjectives);

  if (formData.resume instanceof File) {
    data.append("resume", formData.resume);
  }

  data.append("skills", JSON.stringify(formData.skills));
  data.append("comments", JSON.stringify(formData.comments));
  data.append("languages", JSON.stringify(formData.languages));
  data.append("experiences", JSON.stringify(formData.experiences));
  data.append("education", JSON.stringify(formData.education));
  data.append("certifications", JSON.stringify(formData.certifications));

  data.append("recruiterId", recruiterId);
  data.append("jobId", jobId);
  data.append("status", "under review");

  const response = await api.post("/recruiters/application/add", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  
  return response.data;
};

import api from "./axios";

export const generateObjective = (resumeData) => {
  return api.post("/resume/objective", resumeData);
};
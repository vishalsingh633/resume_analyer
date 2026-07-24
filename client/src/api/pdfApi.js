import api from "./axios";

export const downloadResumePDF = async (resume, template) => {

  const response = await api.post(

    "/pdf/download",

    {
      resume,
      template
    },

    {
      responseType: "blob"
    }

  );

  return response.data;

};
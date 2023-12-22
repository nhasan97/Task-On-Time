import axiosSecure from "./axiosSecure";

export const saveTaskData = async (task) => {
  const response = await axiosSecure.post("/tasks", task);
  return response.data;
};

// export const saveSurveyData = async (data) => {
//     const response = await axiosPublic.post("/surveys", data);
//     return response.data;
//   };

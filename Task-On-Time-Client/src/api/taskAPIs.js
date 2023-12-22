import axiosPublic from "./axiosPublic";
import axiosSecure from "./axiosSecure";

export const saveTaskData = async (task) => {
  const response = await axiosSecure.post("/tasks", task);
  return response.data;
};

export const getTaskData = async () => {
  const response = await axiosPublic.get("/tasks");
  return response.data;
};

//   export const getUserBasedSurveyData = async (email) => {
//     const response = await axiosSecure.get(`/user-surveys?email=${email}`);
//     return response.data;
//   };

export const updateTaskData = async (obj) => {
  const response = await axiosSecure.patch(
    `/tasks/${obj._id}`,
    obj.updatedTask
  );
  return response.data;
};

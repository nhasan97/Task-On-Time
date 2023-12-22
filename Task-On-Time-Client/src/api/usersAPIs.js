import axiosSecure from "./axiosSecure";

export const getRole = async (email) => {
  console.log(email);
  const response = await axiosSecure.get(`/users?email=${email}`);

  return response.data[0].role;
};

export const getUsersData = async () => {
  const response = await axiosSecure.get("/users");
  return response.data;
};

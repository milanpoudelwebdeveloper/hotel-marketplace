import axios from "axios";

export const registerUser = async (user) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/register`,
    user
  );
  return response;
};

export const loginUser = async (user) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/login`,
    user
  );
  return response;
};

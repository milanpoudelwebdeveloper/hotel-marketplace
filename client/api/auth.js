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

//after sign in with stripe update user
export const updateUserInLocalStorage = async (user, next) => {
  if (typeof window !== undefined) {
    let auth = window && JSON.parse(window.localStorage.getItem("authbooking"));
    auth.user = user;
    window.localStorage.setItem("authbooking", JSON.stringify(auth));
    next();
  }
};

import axios from "axios";

export const createConnectAccount = async (token) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getAccountStatus = async (token) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getAcoountBalance = async (token) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

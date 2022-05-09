import axios from "axios";

export const createHotel = async (token, data) => {
  let response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/create-hotel`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getAllHotels = async () => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_API}/get-hotels`);
  return response;
};

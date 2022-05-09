import React, { useEffect, useState } from "react";
import { getAllHotels } from "../api/hotel";
import SmallCard from "antd";
import HotelCard from "../components/HotelCard";

const Home = () => {
  const [hotels, setHotels] = useState([]);

  const getHotels = async () => {
    let response = await getAllHotels();
    setHotels(response.data);
  };
  useEffect(() => {
    getHotels();
  }, []);

  console.log(hotels);

  return (
    <>
      <div className="container-fluid p-5 text-center bg-secondary">
        <h1 className="color-white">All Hotels</h1>
      </div>
      <div className="container-fluid">
        <br />
        {hotels.map((hotel) => (
          <HotelCard hotel={hotel} />
        ))}
      </div>
    </>
  );
};

export default Home;

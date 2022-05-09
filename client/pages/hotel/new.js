import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import { useState } from "react";

import { createHotel } from "../../api/hotel";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import HotelCreateForm from "../../components/form/hotelCreateForm";

const NewHotel = () => {
  const auth = useSelector((state) => state.auth);

  const token = auth?.token;
  //state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  //destructing variables from state

  const { title, content, location, image, price, from, to, bed } = values;

  const [imagePreview, setImagePreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  const handleImageChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //using formdata because we have to send image file to the backend too

      let data = new FormData();

      data.append("title", title);
      data.append("content", content);
      data.append("location", location);
      data.append("price", price);
      image && data.append("image", image);
      data.append("from", from);
      data.append("to", to);
      data.append("bed", bed);
      console.log([...data]);

      const response = await createHotel(token, data);
      toast.success(response.data);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong while trying to create hotel");
    }
  };

  return (
    <PrivateRoute>
      <div className="container-fluid p-5 text-center bg-secondary">
        <h1 className="color-white">Add a new hotel</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelCreateForm
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              values={values}
              handleSubmit={handleSubmit}
              setValues={setValues}
            />
          </div>
          <div className="col-md-2">
            <img
              src={imagePreview}
              alt="image-preview"
              className="img img-fluid m-2"
              style={{ objectFit: "cover", height: "100px", width: "200px" }}
            />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default NewHotel;

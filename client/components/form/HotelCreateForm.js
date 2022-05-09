import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import { DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const HotelCreateForm = ({
  values,
  handleChange,
  handleImageChange,
  handleSubmit,
  setValues,
}) => {
  const { title, location, content, price } = values;
  return (
    <PrivateRoute>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="btn btn-outline-secondary btn-block">
            Image
            <input
              required
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              hidden
            />
          </label>
          <input
            required
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            className="form-control m-2"
            value={title}
          />
          <textarea
            required
            type="text"
            name="content"
            onChange={handleChange}
            placeholder="Content"
            className="form-control m-2"
            value={content}
          />
          <input
            required
            type="text"
            onChange={handleChange}
            placeholder="Location"
            name="location"
            className="form-control m-2"
            value={location}
          />
          <input
            required
            type="number"
            name="price"
            onChange={handleChange}
            placeholder="Price"
            className="form-control m-2"
            value={price}
          />
          <Select
            onChange={(value) => setValues({ ...values, bed: value })}
            className="w-100 m-2"
            size="large"
            placeholder="Number of beds"
          >
            <Option key={1}>{1}</Option>
            <Option key={2}>{2}</Option>
            <Option key={3}>{3}</Option>
            <Option key={4}>{4}</Option>
            <Option key={5}>{5}</Option>
          </Select>
          <DatePicker
            required
            className="form-control m-2"
            placeholder="From date"
            onChange={(date, dateString) => {
              setValues({ ...values, from: dateString });
            }}
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
          />
          <DatePicker
            required
            className="form-control m-2"
            placeholder="To date"
            onChange={(date, dateString) => {
              setValues({ ...values, to: dateString });
            }}
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
          />

          <button className="btn btn-outline-primary m-2" type="submit">
            Save
          </button>
        </div>
      </form>
    </PrivateRoute>
  );
};

export default HotelCreateForm;

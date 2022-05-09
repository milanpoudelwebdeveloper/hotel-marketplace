import React from "react";
import { diffDays } from "../utils/calculateDays";
import { useRouter } from "next/router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

const HotelCard = ({
  hotel: { _id, title, price, location, content, from, to, bed },
}) => {
  const router = useRouter();

  const deleteHotel = (id) => {};
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
            alt="default-hotel-image"
            className="card-image img img-fluid"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">
              {title} <span className="float-right text-primary">${price}</span>
            </h3>
            <p className="alert alert-info">{location}</p>
            <p className="card-text">{`${content.substring(0, 200)}...`}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                Available for {diffDays(from, to)} days
              </span>
            </p>
            <p className="card-text">No. of beds: {bed}</p>
            <p className="card-text">
              Available from: {new Date(from).toLocaleDateString()}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                router.push(`/hotel/${_id}`);
              }}
            >
              Show more
            </button>
            <div className="d-flex justify-content-between h4 mt-4">
              <Link href={`/hotel/edit/${_id}`} passHref>
                <EditOutlined className="text-warning" />
              </Link>
              <DeleteOutlined
                onClick={() => deleteHotel()}
                className="text-danger"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

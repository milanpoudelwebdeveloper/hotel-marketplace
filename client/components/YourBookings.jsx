import React from "react";
import Link from "next/link";

const YourBookings = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Bookings</h2>
        </div>
        <div className="col-md-2">
          <Link href="/" passHref>
            <button className="btn btn-primary">Browse Hotels</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default YourBookings;

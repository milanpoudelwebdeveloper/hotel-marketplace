import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../utils/stripe";
import { toast } from "react-toastify";

const YourHotels = () => {
  const auth = useSelector((state) => state.auth);

  const token = auth?.token;
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(token);
      console.log(res.data);
      //get login link
      window.open(res.data, "_blank");
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast.error("Stripe connect failed. Please try again");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const userStripeExists =
    auth?.user?.stripe_seller && auth?.user?.stripe_seller?.charges_enabled;
  const connected = () => (
    <div className="col-md-2">
      <div className="col-md-10">
        <h2>Your Hotels</h2>
      </div>
      <Link href="/hotel/new" passHref>
        <button className="btn btn-primary">Add New</button>
      </Link>
    </div>
  );

  const notConnected = () => (
    <div
      className="col-md-2"
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <div className="p-5 pointer text-center">
          <HomeOutlined className="h1" />
          <h2>Set up payment to post hotel rooms</h2>
        </div>
      </div>

      <button
        className="btn btn-primary"
        style={{ height: "50px" }}
        onClick={connect}
        disabled={loading}
      >
        {loading ? "Processing" : "Setup Payment"}
      </button>

      <p className="text-muted m-3">
        You will be redirected to stripe to complete the onboarding process
      </p>
    </div>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        {userStripeExists ? connected() : notConnected()}
      </div>
    </div>
  );
};

export default YourHotels;

import React, { useEffect } from "react";

import { LoadingOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAccountStatus } from "../../utils/stripe";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { updateUserInLocalStorage } from "../../api/auth";
import { loggedInUser } from "../../app/userSlice";

//we just want to see the status of user in this page
//we just use loading spinner and also to update the user by getting info from stripe
const StripeCallBack = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (auth && auth.token) {
      accountStatus();
    }
  }, [auth]);

  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth?.token);
      toast.success("User successfully updated");
      console.log(res);
      updateUserInLocalStorage(res.data, () => {
        dispatch(loggedInUser(res.data));
      });
      router.push("/dashboard");
    } catch (e) {
      console.log(e);
      toast.error("Somthing went wrong. Please try again");
    }
  };

  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="h1 p-5 text-danger" />
    </div>
  );
};

export default StripeCallBack;

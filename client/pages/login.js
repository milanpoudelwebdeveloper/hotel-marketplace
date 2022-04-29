import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { loginUser } from "../api/auth";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../app/userSlice";

const login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email,
        password,
      });
      if (response) {
        console.log(response.data);
        if (response.status === 200) {
          //save user and token to local storage
          window.localStorage.setItem(
            "authbooking",
            JSON.stringify(response.data)
          );
          dispatch(loggedInUser(response.data));
          toast.success("Logged in successfully front end");
          router.push("/");
        }
      }
    } catch (e) {
      if (e.response) {
        toast.error(e.response.data);
      }
    }
  };
  return (
    <>
      <div className="container-fluid p-5 text-center bg-secondary">
        <h1>Login</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={login}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control my-4"
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-4"
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;

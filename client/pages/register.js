import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { registerUser } from "../api/auth";

const register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match each other");
      return;
    }
    try {
      const response = await registerUser({
        name,
        email,
        password,
      });
      console.log(response);
      toast.success(response.data);
      router.push("/login");
    } catch (e) {
      if (e.response) {
        toast.error(e.response.data);
      }
    }
  };
  return (
    <>
      <div className="container-fluid p-5 text-center bg-secondary">
        <h1>Register</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={register}>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control my-4"
              />
              <input
                type="text"
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
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control mb-4"
              />

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default register;

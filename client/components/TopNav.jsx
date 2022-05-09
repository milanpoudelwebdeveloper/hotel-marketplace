import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../app/userSlice";
import { useRouter } from "next/router";

const TopNav = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state) => state.auth);

  const userExists = auth && auth !== null;

  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userExists) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userExists]);

  const logOut = () => {
    dispatch(logOutUser(null));
    window.localStorage.removeItem("authbooking");
    router.push("/login");
  };

  return (
    <div className="d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link href="/" className="nav-link" passHref>
        Home
      </Link>
      {!loggedIn && (
        <Link href="/login" className="nav-link" passHref>
          Login
        </Link>
      )}
      {loggedIn && (
        <Link
          href="/dashboard"
          className="nav-link"
          style={{ cursor: "pointer" }}
          passHref
        >
          DashBoard
        </Link>
      )}
      {loggedIn && (
        <p className="nav-link" style={{ cursor: "pointer" }} onClick={logOut}>
          Log Out
        </p>
      )}

      {!loggedIn && (
        <Link href="/register" className="nav-link" passHref>
          Register
        </Link>
      )}
    </div>
  );
};

export default TopNav;

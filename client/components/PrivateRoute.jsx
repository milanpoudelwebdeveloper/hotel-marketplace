import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (auth && auth.token) {
      setLoggedIn(true);
    } else {
      router.replace("/login");
      setLoggedIn(false);
    }
  }, [auth, router]);
  return loggedIn && <>{children}</>;
};

export default PrivateRoute;

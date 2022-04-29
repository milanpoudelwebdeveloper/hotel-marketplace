import Link from "next/link";
import React from "react";

const TopNav = () => {
  return (
    <div className="d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link href="/" className="nav-link" passHref>
        <a>Home</a>
      </Link>
      <Link href="/login" className="nav-link" passHref>
        <a>Login</a>
      </Link>
      <Link href="/register" className="nav-link" passHref>
        <a>Register</a>
      </Link>
    </div>
  );
};

export default TopNav;

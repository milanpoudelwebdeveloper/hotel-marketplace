import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import DashBoardItems from "../../components/DashBoardItems";
import ConnectNav from "../../components/ConnectNav";

const dashboard = () => {
  return (
    <PrivateRoute>
      <div className="container-fluid p-5 text-center bg-secondary">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashBoardItems />
      </div>
    </PrivateRoute>
  );
};

export default dashboard;

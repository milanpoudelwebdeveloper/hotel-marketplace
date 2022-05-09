import React from "react";
import TabsResuable from "./Common/TabsResuable";
import Link from "next/link";
import YourBookings from "./YourBookings";
import YourHotels from "./YourHotels";

const DashBoardItems = () => {
  return (
    <div>
      <TabsResuable>
        <div label="Your Bookings">
          <YourBookings />
        </div>
        <div label="Your Hotels">
          <YourHotels />
        </div>
      </TabsResuable>
    </div>
  );
};

export default DashBoardItems;

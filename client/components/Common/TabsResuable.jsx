import React, { useState } from "react";

const TabsResuable = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  console.log(activeTab);
  return (
    <div>
      <ul className="rtab">
        {children.map((item, index) => (
          <li
            className={index === activeTab ? "rtab li current" : "rtab li"}
            key={index}
            onClick={() => setActiveTab(index)}
          >
            {item.props.label}
          </li>
        ))}
      </ul>
      {/* tab-content here */}
      {children.map((item, index) => (
        <div
          key={index}
          className={index === activeTab ? "active content" : "content"}
        >
          {item.props.children}
        </div>
      ))}
    </div>
  );
};

export default TabsResuable;

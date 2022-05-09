import React, { useState } from "react";

//basic level tab component

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="tabs">
      <div className="tabs-list">
        <div
          className={activeTab === 1 ? "tab-list active-tablist" : "tab-list"}
          onClick={() => setActiveTab(1)}
        >
          Tabs 1
        </div>
        <div
          className={activeTab === 2 ? "tab-list active-tablist" : "tab-list"}
          onClick={() => setActiveTab(2)}
        >
          Tab 2
        </div>
        <div
          className={activeTab === 3 ? "tab-list active-tablist" : "tab-list"}
          onClick={() => setActiveTab(3)}
        >
          Tab 3
        </div>
      </div>
      <div className="tab-panels">
        <div
          className={
            activeTab === 1 ? "tab-panel active-tabpanel" : "tab-panel"
          }
        >
          <p>This is tab 1</p>
        </div>
        <div
          className={
            activeTab === 2 ? "tab-panel active-tabpanel" : "tab-panel"
          }
        >
          <p>This is tab 2</p>
        </div>
        <div
          className={
            activeTab === 3 ? "tab-panel active-tabpanel" : "tab-panel"
          }
        >
          <p>This is tab 3</p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;

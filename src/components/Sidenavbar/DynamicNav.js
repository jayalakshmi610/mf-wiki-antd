import React, { useState } from "react";
import { Collapse, Dropdown, Button } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import {
  FaHome,
  FaComments,
  FaShareAlt,
  FaLock,
  FaChartLine,
  FaUsers,
  FaShieldAlt,
  FaCogs,
  FaBriefcase,
  FaBullhorn,
  FaBox,
  FaHandshake,
  FaCode,
  FaDatabase,
  FaUserPlus,
  FaGraduationCap,
  FaMedkit,
  FaPlus,
  FaStar,
} from "react-icons/fa";
import { MoreHorizontal } from "lucide-react";
import { moreHorizontalData } from "../../data/Morehorizontaldata";
import { newNavData } from "../navdata";

const { Panel } = Collapse;
const iconsize = 15; // Default size for main navigation icons
const submenuicon = 15;

const DynamicNav = () => {
  const [expandedKey, setExpandedKey] = useState(null); // Track the expanded key
  const [childData, setChildData] = useState({}); // Tracks child items for each parent

  const handleAddChild = (key) => {
    // Add a new child dynamically under the corresponding section
    setChildData((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), `New Page ${prev[key]?.length + 1 || 1}`],
    }));
    // Ensure the panel is expanded when a new child is added
    setExpandedKey(key); // Expand the panel when a new child is added
  };
  const items = [...moreHorizontalData];

  return (
    <Collapse
      accordion
      activeKey={expandedKey} // Control the expanded state using activeKey
      onChange={(key) => setExpandedKey(key)} // Update the expanded key when the user manually expands/collapses
    >
      {newNavData.map((item) => (
        <Panel
          key={item.key}
          header={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {item.icon}
                <span style={{ marginLeft: 8 }}>{item.label}</span>
              </div>
              <div className="flex items-center gap-1">
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <Button
                    icon={
                      <MoreHorizontal className="w-4 h-4 d-flex text-center text-gray-400" />
                    }
                    type="text"
                  ></Button>
                </Dropdown>
                <PlusOutlined
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering panel collapse
                    handleAddChild(item.key); // Handle adding a child and expanding the panel when PlusOutlined is clicked
                  }}
                />
              </div>
            </div>
          }
        >
          <div>
            {(childData[item.key] || []).map((child, index) => (
              <div
                key={`${item.key}-child-${index}`}
                style={{ paddingLeft: 20, marginTop: 5 }}
              >
                <div>{child}</div>
              </div>
            ))}
          </div>
        </Panel>
      ))}
    </Collapse>
  );
};

export default DynamicNav;

import {
  AppstoreOutlined,
  EllipsisOutlined,
  HomeOutlined,
  MailOutlined,
  MoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, message, Modal, Space } from "antd";
import React, { useState } from "react";
import styles from "./styles/navdata.module.css";

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
  FaFileAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import PageCreator from "../components/Sidenav_icons/PageCreator/PageCreator";
import NewPage from "./Sidenavbar/NewPage";
import { MenuDropdown } from "./Sidenav_icons/MenuDropdown/MenuDropdown";

import { useDocumentStore } from "./Sidenav_icons/store/documentStore";
import { Home, MoreHorizontal } from "lucide-react";
import { moreHorizontalData } from "../data/Morehorizontaldata";
import { addChild } from "./Sidenavbar/SideNav";
import { useNavData } from "./Sidenavbar/Navdataprovider";

// Define sizes for the icons
const iconsize = 15; // Default size for main navigation icons
const submenuicon = 15; // Size for submenu icons

// Define styles for submenu items
const submenuStyle = {
  padding: "10px",
  backgroundColor: "#f0f0f0", // Example background color
  borderRadius: "4px", // Example border radius
  // Add any other styles you need
};

// Define the top-level navigation items
export const NavDatatop = [
  {
    name: "Home",
    icon: <FaHome size={iconsize} color="#36B37E" />,
    path: "/Home",
  },
  {
    name: "Uni AI",
    icon: <FaComments size={iconsize} color="#00B8D9" />,
    path: "/Uni AI",
  },
  {
    name: "Inbox",
    icon: <FaShareAlt size={iconsize} color="#6554C0" />,
    path: "/inbox",
  },
];
// Define the bottom-level navigation items with potential submenus
export const NavdataBottom = [
  {
    name: "My private channel",
    icon: <FaLock size={iconsize} color="#FFAB00" />,
    path: "/my-private-channel",
    submenu: [
      {
        name: "Company home",
        icon: <FaHome size={submenuicon} color="#FF5630" />,
        path: "/my-private-channel/company-home",
        style: submenuStyle, // Use dynamic style
      },
    ],
  },
  {
    name: "Admin & finance",
    icon: <FaChartLine size={iconsize} color="#FF5630" />,
    path: "/admin-finance",
    submenu: [
      {
        name: "Benefits",
        icon: <FaMedkit size={submenuicon} color="#00B8D9" />,
        path: "/admin-finance/benefits",
        style: submenuStyle, // Use dynamic style
      },
    ],
  },
  {
    name: "Data",
    icon: <FaChartLine size={iconsize} color="#36B37E" />,
    path: "/data",
    submenu: [
      {
        key: "Reports",
        label: "Reports",
        icon: <FaChartLine size={submenuicon} color="#00B8D9" />,
      },
      {
        key: "Analytics",
        label: "Analytics",
        icon: <FaBullhorn size={submenuicon} color="#FFAB00" />,
      },
      {
        key: "Data Management",
        label: "Data Management",
        icon: <FaDatabase size={submenuicon} color="#6554C0" />,
      },
    ],
  },
  {
    name: "Engineering",
    icon: <FaCogs size={iconsize} color="#00B8D9" />,
    path: "/engineering",
    submenu: [
      {
        name: "Frontend",
        icon: <FaCode size={submenuicon} color="#FF5630" />,
        path: "/engineering/frontend",
      },
      {
        name: "Backend",
        icon: <FaDatabase size={submenuicon} color="#36B37E" />,
        path: "/engineering/backend",
      },
    ],
  },
  {
    name: "Human Resources",
    icon: <FaUsers size={iconsize} color="#FF5630" />,
    path: "/human-resources",
    submenu: [
      {
        name: "Recruitment",
        icon: <FaUserPlus size={submenuicon} color="#FF5630" />,
        path: "/human-resources/recruitment",
      },
      {
        name: "Training",
        icon: <FaGraduationCap size={submenuicon} color="#36B37E" />,
        path: "/human-resources/training",
      },
    ],
  },
  {
    name: "General",
    icon: <FaBriefcase size={iconsize} color="#6554C0" />,
    path: "/general",
    submenu: [
      {
        name: "The Handbook",
        icon: <FaComments size={submenuicon} color="#36B37E" />,
        path: "/general/the-handbook",
      },
      {
        name: "People & culture",
        icon: <FaUsers size={submenuicon} color="#00B8D9" />,
        path: "/general/people-culture",
      },
      {
        name: "Strategy",
        icon: <FaChartLine size={submenuicon} color="#6554C0" />,
        path: "/general/strategy",
      },
      {
        name: "Policies",
        icon: <FaLock size={submenuicon} color="#FFAB00" />,
        path: "/general/policies",
      },
    ],
  },
  {
    name: "Marketing",
    icon: <FaBullhorn size={iconsize} color="#36B37E" />,
    path: "/marketing",
    submenu: [],
  },
  {
    name: "Product",
    icon: <FaBox size={iconsize} color="#00B8D9" />,
    path: "/product",
    submenu: [
      {
        key: "Product Overview",
        label: "Product Overview",
        icon: <FaBriefcase size={submenuicon} color="#FF5630" />,
      },
      {
        key: "Product Features",
        label: "Product Features",
        icon: <FaBullhorn size={submenuicon} color="#36B37E" />,
      },
      {
        key: "Product Roadmap",
        label: "Product Roadmap",
        icon: <FaChartLine size={submenuicon} color="#00B8D9" />,
      },
    ],
  },
  {
    name: "Sales & CS",
    icon: <FaHandshake size={iconsize} color="#6554C0" />,
    path: "/sales-cs",
    submenu: [
      {
        name: "Company home",
        icon: <FaHome size={submenuicon} color="#FF5630" />,
        path: "/sales-cs/company-home",
      },
    ],
  },
  {
    name: "Security",
    icon: <FaShieldAlt size={iconsize} color="#FFAB00" />,
    path: "/security",
    submenu: [
      {
        key: "User Permissions",
        label: "User Permissions",
        icon: <FaLock size={submenuicon} color="#FFAB00" />,
      },
      {
        key: "Data Protection",
        label: "Data Protection",
        icon: <FaShieldAlt size={submenuicon} color="#00B8D9" />,
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "Favorites",
    label: "Favorites",
    icon: <FaStar size={submenuicon} color="#FFAB00" />,
  },
];
const handleAddClick = (sectionId, buttonId, e) => {
  e.preventDefault();
  e.stopPropagation();
  setSelectedSection({ sectionId, buttonId });
  setIsModalOpen(true);
};
const SectionActions = (id) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const handleAddClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const [showPageCreator, setShowPageCreator] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [newPageName, setNewPageName] = useState("NewPage");
  const { navData, setNavData } = useNavData();

  const handlePageCreatorClick = (sectionId) => {
    setActiveSection(sectionId);
    setNewPageName("NewPage");

    // Attempt to navigate to NewPage
    const navigateToNewPage = (sectionId) => {
      console.log("Navigating to NewPage");
      navigate("/NewPage");
    };

    // Fallback to EditorContainer if navigation fails
    const fallbackToEditorContainer = () => {
      navigate("/EditorContainer");
    };
    const addChild = (sectionId) => {
      setNavData((prevNavData) =>
        prevNavData.map((item) => {
          //console.log(item);
          console.log(sectionId.id);

          if (item.key === sectionId.id) {
            // Initialize `children` as an array if it's undefined
            const children = item.children || [];
            return {
              ...item,
              children: [
                ...children,
                {
                  key: `Page${children.length + 1}`,
                  label: createLabel(`Page ${children.length + 1}`),
                  icon: <FaFileAlt size={submenuicon} color="#FFAB00" />,
                },
              ],
            };
          } else if (item.children) {
            // Recursively process children
            return {
              ...item,
              children: updateChildren(item.children || [], sectionId.id),
            };
          }
          return item;
        })
      );
    };
    addChild(sectionId);

    const updateChildren = (children = [], sectionId) =>
      children.map((child) => {
        if (child.key === sectionId) {
          const childChildren = child.children || [];
          return {
            ...child,
            children: [
              ...childChildren,
              {
                key: `Page${childChildren.length + 1}`,
                label: createLabel(`Page ${childChildren.length + 1}`),

                icon: <FaFileAlt size={submenuicon} color="#FFAB00" />,
              },
            ],
          };
        } else if (child.children) {
          return {
            ...child,
            children: updateChildren(child.children || [], sectionId),
          };
        }
        return child;
      });

    // Find the section in navData and add a new child
    const updatedNavData = navData.map((section) => {
      if (section.key === sectionId && section.children) {
        return {
          ...section,
          children: [
            ...section.children,
            {
              key: `NewPage-${Date.now()}`, // Unique key for the new child
              label: createLabel("NewPage"),
              icon: <FaBullhorn size={submenuicon} color="#36B37E" />, // Example icon
            },
          ],
        };
      }
      return section;
    });

    // Update the state with the new navigation data

    // Try to navigate to NewPage, fallback to EditorContainer if needed
    try {
      navigateToNewPage();
    } catch (error) {
      fallbackToEditorContainer();
    }
  };

  const { currentDocument } = useDocumentStore();
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const items = [...moreHorizontalData];
  //const itemss = [...NewPage];

  return (
    <>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          right: "5px",
          gap: "5px",
        }}
        className={styles.labelContainer}
      >
        <div className="flex items-center gap-1">
          <>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button
                icon={
                  <MoreHorizontal className="w-4 h-4 d-flex text-center hover:bg-gray-100 text-gray-500" />
                }
                type="text"
                style={{ zIndex: 1, background: "whitesmoke" }}
              ></Button>
            </Dropdown>
            <Button
              type="text"
              style={{ color: "red" }}
              icon={<PageCreator />}
              onClick={() => handlePageCreatorClick(id)}
            ></Button>
          </>
          {/* Section actions are now only visible when parent is hovered */}
          <div className={styles.sectionActions} style={{ display: "none" }}>
            {/* Or any other component you want to render */}
          </div>
        </div>
      </span>
      {/* Add hover effect to show section actions */}
      <style jsx>{`
        .${styles.labelContainer} {
          position: relative; // Ensure the hover effect works correctly
        }
        .${styles.labelContainer}:hover .${styles.sectionActions} {
          display: block; // Show section actions on hover
        }
      `}</style>
    </>
  );
};

const createLabel = (text) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }}
  >
    <span
      style={{
        flexGrow: 1,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </span>

    <SectionActions id={text} />
  </div>
);

export const newNavData = [
  {
    compact: true,
    key: "Home",
    label: createLabel("Home"),
    icon: <FaHome size={iconsize} color="#36B37E" />,
  },
  {
    compact: true,
    key: "Uni AI",
    label: createLabel("Uni AI"),
    icon: <FaComments size={iconsize} color="#00B8D9" />,
  },
  {
    compact: true,
    key: "Inbox",
    label: createLabel("Inbox"),
    icon: <FaShareAlt size={iconsize} color="#6554C0" />,
  },
  {
    type: "divider",
  },
  {
    compact: true,
    key: "Workspace",
    label: "Workspace",
    type: "group",
    style: {
      scrollbarWidth: "thin",
      overflowY: "auto",
      maxHeight: "calc(100vh - 150px)",
    },
    children: [
      {
        key: "My private channel",
        label: createLabel("My private channel"),
        icon: <FaHome size={iconsize} color="#FF5630" />,
        children: [
          {
            key: "Company home",
            label: createLabel("Company home"),
            icon: <FaHome size={submenuicon} color="#FF5630" />,
          },
        ],
      },
      {
        key: "Admin & finance",
        label: createLabel("Admin & finance"),
        icon: <FaChartLine size={iconsize} color="#FF5630" />,
        children: [
          {
            key: "Benefits",
            label: createLabel("Benefits"),
            icon: <FaMedkit size={submenuicon} color="#00B8D9" />,
          },
        ],
      },
      {
        key: "Data",
        label: createLabel("Data"),
        icon: <FaChartLine size={iconsize} color="#36B37E" />,
        children: [
          {
            key: "Reports",
            label: createLabel("Reports"),
            icon: <FaChartLine size={submenuicon} color="#00B8D9" />,
          },
          {
            key: "Analytics",
            label: createLabel("Analytics"),
            icon: <FaBullhorn size={submenuicon} color="#FFAB00" />,
          },
          {
            key: "Data Management",
            label: createLabel("Data Management"),
            icon: <FaDatabase size={submenuicon} color="#6554C0" />,
          },
        ],
      },
      {
        key: "Engineering",
        label: createLabel("Engineering"),
        icon: <FaCogs size={iconsize} color="#00B8D9" />,
        children: [
          {
            key: "Frontend",
            label: createLabel("Frontend"),
            icon: <FaCode size={submenuicon} color="#FF5630" />,
          },
          {
            key: "Backend",
            label: createLabel("Backend"),
            icon: <FaDatabase size={submenuicon} color="#36B37E" />,
          },
        ],
      },
      {
        key: "Human Resources",
        label: createLabel("Human Resources"),
        icon: <FaUsers size={iconsize} color="#FF5630" />,
        children: [
          {
            key: "Recruitment",
            label: createLabel("Recruitment"),
            icon: <FaUserPlus size={submenuicon} color="#FF5630" />,
          },
          {
            key: "Training",
            label: createLabel("Training"),
            icon: <FaGraduationCap size={submenuicon} color="#36B37E" />,
          },
        ],
      },
      {
        key: "General",
        label: createLabel("General"),
        icon: <FaBriefcase size={iconsize} color="#6554C0" />,
        children: [
          {
            key: "The Handbook",
            label: createLabel("The Handbook"),
            icon: <FaComments size={submenuicon} color="#36B37E" />,
          },
          {
            key: "People & culture",
            label: createLabel("People & culture"),
            icon: <FaUsers size={submenuicon} color="#00B8D9" />,
          },
          {
            key: "Strategy",
            label: createLabel("Strategy"),
            icon: <FaChartLine size={submenuicon} color="#6554C0" />,
          },
          {
            key: "Policies",
            label: createLabel("Policies"),
            icon: <FaLock size={submenuicon} color="#FFAB00" />,
          },
        ],
      },
      {
        key: "Marketing",
        label: createLabel("Marketing"),
        icon: <FaBullhorn size={iconsize} color="#36B37E" />,
        children: [
          {
            key: "Campaigns",
            label: createLabel("Campaigns"),
            icon: <FaBullhorn size={submenuicon} color="#00B8D9" />,
          },

          {
            key: "Social Media",
            label: createLabel("Social Media"),
            icon: <FaShareAlt size={submenuicon} color="#6554C0" />,
          },
        ],
      },
      {
        key: "Product",
        label: createLabel("Product"),
        icon: <FaBox size={iconsize} color="#00B8D9" />,
        children: [
          {
            key: "Product Overview",
            label: createLabel(" Overview"),
            icon: <FaBriefcase size={submenuicon} color="#FF5630" />,
          },
          {
            key: "Product Features",
            label: createLabel(" Features"),
            icon: <FaBullhorn size={submenuicon} color="#36B37E" />,
          },
          {
            key: "Product Roadmap",
            label: createLabel(" Roadmap"),
            icon: <FaChartLine size={submenuicon} color="#00B8D9" />,
          },
        ],
      },
      {
        key: "Sales & CS",
        label: createLabel("Sales & CS"),
        icon: <FaHandshake size={iconsize} color="#6554C0" />,
        children: [
          {
            key: "Customer Support",
            label: createLabel("Customer Support"),
            icon: <FaComments size={submenuicon} color="#FFAB00" />,
          },
          {
            key: "Sales Reports",
            label: createLabel("Sales Reports"),
            icon: <FaChartLine size={submenuicon} color="#00B8D9" />,
          },
        ],
      },
      {
        key: "Security",
        label: createLabel("Security"),
        icon: <FaShieldAlt size={iconsize} color="#FFAB00" />,
        children: [
          {
            key: "User Permissions",
            label: createLabel("User Permissions"),
            icon: <FaLock size={submenuicon} color="#FFAB00" />,
          },
          {
            key: "Data Protection",
            label: createLabel("Data Protection"),
            icon: <FaShieldAlt size={submenuicon} color="#00B8D9" />,
          },
        ],
      },
      {
        type: "divider",
      },
      {
        key: "Favorites",
        label: "Favorites",
        icon: <FaStar size={submenuicon} color="#FFAB00" />,
        children: [],
      },
    ],
  },
];

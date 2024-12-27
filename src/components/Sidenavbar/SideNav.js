import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  theme,
  Input,
  Dropdown,
  Button,
  Space,
  ConfigProvider,
  EllipsisOutlined,
  Tooltip,
} from "antd";
import {
  AppstoreOutlined,
  HomeOutlined,
  MailOutlined,
  MoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  CalendarOutlined,
  SwapOutlined,
  ClockCircleOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { FaTasks } from "react-icons/fa";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { FaEllipsisH } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { MdPlayArrow } from "react-icons/md";
import styles from "../styles/SideNav.module.css";
import { NavdataBottom, NavDatatop, newNavData } from "../navdata";
import workspaces from "../../data/workspaces";
import AddPageModal from "../../components/AddPageModal";
import { useNavigate } from "react-router-dom";
import { MenuDropdown } from "../Sidenav_icons/MenuDropdown/MenuDropdown";
import PageCreator from "../../components/Sidenav_icons/PageCreator/PageCreator";
import { useDocumentStore } from "../Sidenav_icons/store/documentStore";
import toast from "react-hot-toast";
import Calendar from "../Sidenavbar/Calendar";
import RecentlyVisited from "../Sidenavbar/RecentlyVisited";
import { useNavData } from "./Navdataprovider";
const { Sider } = Layout;

const SideNav = ({ onItemClick, currentPath }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [hoveredButton, setHoveredButton] = useState({
    sectionId: null,
    buttonId: null,
  });
  const { currentDocument } = useDocumentStore();
  const [selectedTitle, setSelectedTitle] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [clickedSection, setClickedSection] = useState(null);
  const [openKeys, setOpenKeys] = useState([]);
  const customtheme = {
    components: {
      Menu: {
        itemPadding: 0,
      },
    },
  };
  const [accountType, setAccountType] = useState("personal");
  const [showCalendar, setShowCalendar] = useState(false);
  const [recentlyVisited, setRecentlyVisited] = useState([]);
  const MAX_RECENT_ITEMS = 10; // Maximum number of items to store
  const [showRecentlyVisited, setShowRecentlyVisited] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const handleItemHover = (sectionId) => {
    setHoveredSection(sectionId);
  };

  const { navData, setNavData } = useNavData();

  const updateChildren = (children, id) => {
    return children.map((child) => {
      if (child.key === id) {
        return {
          ...child,
          children: [
            ...(child.children || []),
            {
              key: `Page${child.children?.length + 1 || 1}`,
              label: createLabel(`Page ${child.children?.length + 1 || 1}`),
              icon: <FaFileAlt size={submenuicon} color="#FFAB00" />,
            },
          ],
        };
      } else if (child.children) {
        return {
          ...child,
          children: updateChildren(child.children, id),
        };
      }
      return child;
    });
  };

  const handleItemLeave = () => {
    setHoveredSection(null);
  };

  const handleItemClick = (sectionId) => {
    setClickedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  useEffect(() => {
    // Update active item based on current path
    const foundItem = NavdataBottom.find((item) => item.path === currentPath);
    setActiveItem(foundItem);
  }, [currentPath]);

  const handleAddClick = (sectionId, buttonId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSection({ sectionId, buttonId });
    setIsModalOpen(true);
  };

  const handleToggleSubmenu = (key) => {
    setOpenKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key]
    );
  };

  const generateNewNavDataItems = (data, prefix) =>
    data.map((item, index) => ({
      key: `${prefix}-${index}`,
      icon: (
        <div
          className={styles.menuIcon}
          onMouseEnter={() => handleItemHover(`${prefix}-${index}`)}
          onMouseLeave={handleItemLeave}
        >
          {hoveredSection === `${prefix}-${index}` ? (
            <span
              role="img"
              aria-label="down"
              className="anticon anticon-down"
              style={{
                display: "inline-block",
              }}
            >
              <DownOutlined
                className={styles.submenuArrow}
                rotate={clickedSection === `${prefix}-${index}` ? 180 : 0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleSubmenu(`${prefix}-${index}`);
                  handleItemClick(`${prefix}-${index}`);
                }}
              />
            </span>
          ) : (
            <span className={styles.itemIcon}>{item.icon}</span>
          )}
        </div>
      ),
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            className={styles.menuItemText}
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
              userSelect: "none",
              transition: "none",
              cursor: "pointer",
              width: "100%",
              borderRadius: "6px",
              marginLeft: "0px",
              fontSize: "14px",
            }}
          >
            {item.label}
          </span>
          <div
            className={styles.pageIcons}
            style={{
              display: "flex",
              alignItems: "center",
              outline: "none",
              position: "absolute",
              right: "5px",
            }}
          >
            <MenuDropdown style={{ fontSize: "10px" }} />
            <PageCreator style={{ fontSize: "10px", color: "red" }} />
          </div>
        </div>
      ),
      children: item.submenu?.map((subItem, subIndex) => ({
        key: `${prefix}-${index}-${subIndex}`,
        icon: (
          <div
            onMouseEnter={() =>
              handleItemHover(`${prefix}-${index}-${subIndex}`)
            }
            onMouseLeave={handleItemLeave}
          >
            {hoveredSection === `${prefix}-${index}-${subIndex}` ? (
              <DownOutlined
                className={styles.submenuArrow}
                rotate={
                  clickedSection === `${prefix}-${index}-${subIndex}` ? 180 : 0
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleSubmenu(`${prefix}-${index}-${subIndex}`);
                  handleItemClick(`${prefix}-${index}-${subIndex}`);
                }}
              />
            ) : (
              <span className={styles.submenuIcon}>{subItem.icon}</span>
            )}
          </div>
        ),
        label: (
          <span
            className={styles.menuItemText}
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
              userSelect: "none",
              transition: "none",
              cursor: "pointer",
              width: "100%",
              borderRadius: "6px",
              marginLeft: "0px",
              fontSize: "14px",
              padding: "8px 0",
            }}
            onClick={() => navigate(subItem.path)}
          >
            {subItem.name}
          </span>
        ),
      })),
    }));

  const items2 = generateNewNavDataItems(NavdataBottom, "bottom");
  const topItems = generateNewNavDataItems(NavDatatop, "top");

  const handleDuplicatePage = () => {
    try {
      // Get the current document details
      const documentToClone = currentDocument;
      if (!documentToClone) {
        toast.error("No document selected to duplicate");
        return;
      }

      // Create a new document with the same content but different name
      const newDocName = `${documentToClone.name} (Copy)`;
      // Add your document creation logic here

      toast.success("Page duplicated successfully");
    } catch (error) {
      toast.error("Failed to duplicate page");
      console.error("Duplication error:", error);
    }
  };

  const handleMovePage = () => {
    try {
      if (!currentDocument) {
        toast.error("No document selected to move");
        return;
      }

      // Add your move document logic here
      // You might want to open a modal with location options

      toast.info("Move functionality coming soon");
    } catch (error) {
      toast.error("Failed to move page");
      console.error("Move error:", error);
    }
  };

  const handleExportPage = () => {
    try {
      if (!currentDocument) {
        toast.error("No document selected to export");
        return;
      }

      // Add your export logic here
      // You might want to show a modal with export options (PDF, HTML, etc.)

      toast.info("Export functionality coming soon");
    } catch (error) {
      toast.error("Failed to export page");
      console.error("Export error:", error);
    }
  };

  const handleDeletePage = () => {
    try {
      if (!currentDocument) {
        toast.error("No document selected to delete");
        return;
      }

      // You might want to show a confirmation dialog before deleting
      if (window.confirm("Are you sure you want to delete this page?")) {
        // Add your delete logic here

        toast.success("Page deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete page");
      console.error("Delete error:", error);
    }
  };

  const handleSwitchAccount = (newType) => {
    setAccountType(newType);
    toast.success(`Switched to ${newType} account`);
    // Add any additional logic needed when switching accounts
  };

  const addToRecentlyVisited = (page) => {
    setRecentlyVisited((prevRecent) => {
      // Remove the page if it already exists (to avoid duplicates)
      const filteredRecent = prevRecent.filter((item) => item.id !== page.id);

      // Add the new page at the beginning
      const newRecent = [page, ...filteredRecent];

      // Keep only the most recent MAX_RECENT_ITEMS
      const trimmedRecent = newRecent.slice(0, MAX_RECENT_ITEMS);

      // Store in localStorage
      localStorage.setItem("recentlyVisited", JSON.stringify(trimmedRecent));

      return trimmedRecent;
    });
  };

  const loadRecentlyVisited = () => {
    try {
      const stored = localStorage.getItem("recentlyVisited");
      if (stored) {
        setRecentlyVisited(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading recently visited pages:", error);
    }
  };

  useEffect(() => {
    loadRecentlyVisited();
  }, []);

  const handleMore = () => {
    const items = [
      {
        key: "myTasks",
        label: "My Tasks",
        icon: <FaTasks />,
        onClick: () => navigate("/my-tasks"),
      },
      {
        key: "calendar",
        label: "Calendar",
        icon: <CalendarOutlined />,
        onClick: () => setShowCalendar(!showCalendar),
      },
      {
        key: "recentlyVisited",
        label: "Recently visited",
        icon: <ClockCircleOutlined />,
        onClick: () => {
          setShowRecentlyVisited(true);
        },
      },
      {
        type: "divider",
      },
      {
        key: "switchAccount",
        label:
          accountType === "personal"
            ? "Switch to official account"
            : "Switch to personal account",
        icon:
          accountType === "personal" ? (
            <UserSwitchOutlined />
          ) : (
            <SwapOutlined />
          ),
        onClick: () =>
          handleSwitchAccount(
            accountType === "personal" ? "official" : "personal"
          ),
      },
    ];

    return items;
  };

  const trackPageVisit = (page) => {
    const pageData = {
      id: page.id,
      title: page.title,
      path: page.path,
      timestamp: new Date().toISOString(),
    };
    addToRecentlyVisited(pageData);
  };

  const handleNavigation = (page) => {
    trackPageVisit(page);
    navigate(page.path);
  };

  const handleSelect = (key) => {
    const workspace = workspaces.find((ws) => ws.id === key);
    setSelectedWorkspace(workspace);
  };

  const menuItems = workspaces.map((workspace) => ({
    key: workspace.id,
    label: (
      <div onClick={() => handleSelect(workspace.id)}>{workspace.name}</div>
    ),
  }));

  return (
    <Sider
      width={256}
      style={{
        background: colorBgContainer,
        height: "100%",
        position: "relative",
        overflow: "hidden",
        borderInlineEnd: "1px solid rgba(5, 5, 5, 0.06)",
      }}
    >
      {/* Fixed Header */}
      <div className={styles.header}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.titleBar}>
            <div style={{ background: "transparent" }}>
              <Space className={styles.titleText}>
                <Dropdown
                  menu={{
                    items: menuItems,
                  }}
                >
                  <Button
                    type="text"
                    style={{
                      width: "200px",
                      height: "auto",
                      fontWeight: "normal",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "0px",
                      paddingLeft: "0px",
                    }}
                  >
                    {selectedWorkspace ? (
                      <div>
                        <h4>{selectedWorkspace.name}</h4>
                      </div>
                    ) : (
                      <div>
                        <h4>My Workspace</h4>
                      </div>
                    )}
                    <DownOutlined
                      style={{
                        color: "rgb(114, 19, 146)",
                      }}
                    />
                  </Button>
                </Dropdown>

                <Dropdown menu={{ items: handleMore() }} trigger={["click"]}>
                  <Button
                    icon={<MoreOutlined style={{ color: "#8230ff" }} />}
                    type="text"
                  />
                </Dropdown>
              </Space>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className={styles.searchContainer}>
          <Input
            placeholder="Search"
            className={styles.searchInput}
            style={{
              outline: "none",
              fontSize: "14px",
              color: "#8230ff",
            }}
            prefix={<SearchOutlined />}
            aria-label="Search"
          />
        </div>

        <ConfigProvider theme={{ compact: true }}>
          <Menu
            className={styles.menu}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={navData.map((item) => ({
              ...item,
              label: (
                <div
                  className={styles.menuItem}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    className={styles.menuItemText}
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: "1",
                      marginRight: "8px", // Add space between text and icons
                    }}
                  >
                    {item.label}
                  </span>
                  {item.icons && (
                    <div
                      className={styles.menuItemIcons}
                      style={{ flexShrink: 0 }}
                    >
                      {item.icons}
                    </div>
                  )}
                </div>
              ),
            }))}
          />
        </ConfigProvider>
        {/* Top Navigation Menu */}
        <ConfigProvider theme={customtheme}>
          <Menu
            mode="inline"
            style={{ padding: 0, display: "none" }}
            items={topItems}
          />
        </ConfigProvider>
        <div className={styles.workspaceHeading}>
          <h4
            style={{
              display: "none",
              marginBottom: "0px",
              alignItems: "center",
              textAlign: "left",
              fontSize: "12px",
              color: "rgb(145, 145, 142)",
            }}
          >
            Workspace
          </h4>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className={styles.scrollableContent}>
        {/* Workspace Section */}
        <div className={styles.workspaceSection}>
          <div className={styles.workspaceMenu}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                display: "none",
                height: "100%",
                borderRight: 0,
                paddingLeft: "0px",
                ".ant-menu-submenu-arrow": { display: "flex" },
              }}
              items={items2}
            />
          </div>
        </div>
      </div>

      {/* Add Calendar Modal/Popup */}
      {showCalendar && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            background: "white",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <h3>Calendar</h3>
            <Button type="text" onClick={() => setShowCalendar(false)}>
              ×
            </Button>
          </div>
          <Calendar />
        </div>
      )}

      {showRecentlyVisited && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            background: "white",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            borderRadius: "8px",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <h3>Recently Visited</h3>
            <Button type="text" onClick={() => setShowRecentlyVisited(false)}>
              ×
            </Button>
          </div>
          <div>
            {recentlyVisited.map((page) => (
              <div
                key={page.id}
                onClick={() => handleNavigation(page)}
                style={{
                  cursor: "pointer",
                  padding: "8px",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                {page.title}
              </div>
            ))}
          </div>
        </div>
      )}

      <AddPageModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        section={selectedSection}
      />

      <div className={styles.selectedTitle}>
        <h2>{activeItem ? activeItem.name : "No Active Item"}</h2>
      </div>
    </Sider>
  );
};

export default SideNav;

import React, { useState } from "react";
import {
  StarOutlined,
  LinkOutlined,
  CopyOutlined,
  FormOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";
import { Modal, Input, Select, message } from "antd";
import { createRoot } from "react-dom/client";
import EditorContainer from "../components/BlocksuiteEditor/EditorContainer";

//import { on } from "@blocksuite/blocks";

// Add this function before moreHorizontalData
const copyLinkToClipboard = async () => {
  try {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    message.success("Link copied to clipboard");
  } catch (err) {
    message.error("Failed to copy link");
  }
};

// Add this function before moreHorizontalData
const duplicatePage = async () => {
  try {
    // You might want to get the current page data from your app state or context
    const currentPageData = {
      // Add relevant page data here
      title: document.title,
      content: "", // Get this from your app state
      timestamp: new Date().toISOString(),
    };

    // Create a copy with a modified title
    const duplicatedData = {
      ...currentPageData,
      title: `${currentPageData.title} (Copy)`,
    };

    // Here you would typically:
    // 1. Call your API or state management function to save the duplicate
    // await savePage(duplicatedData);

    message.success("Page duplicated successfully");
    return duplicatedData;
  } catch (error) {
    message.error("Failed to duplicate page");
    console.error("Duplication error:", error);
  }
};

const handleRename = async (oldName, sectionId) => {
  const [newName, setNewName] = useState("");

  Modal.confirm({
    title: "Rename Page",
    content: (
      <Input
        defaultValue={oldName}
        onChange={(e) => setNewName(e.target.value)}
      />
    ),
    onOk: async () => {
      if (!newName.trim()) {
        message.error("New name cannot be empty");
        return;
      }
      // Here you would typically update the section's name in your state or API
      // await updateSectionName(sectionId, newName); // Example function to update the name
      message.success(`Page renamed to "${newName}"`);
    },
  });
};

// Add this function before moreHorizontalData
const handleMoveTo = async () => {
  const availableSections = [
    { id: "1", name: "Personal Notes", path: "/personal" },
    { id: "2", name: "Work Projects", path: "/work" },
  ];

  Modal.confirm({
    title: "Move Page To",
    content: (
      <Select style={{ width: "100%" }}>
        {availableSections.map((section) => (
          <Select.Option key={section.id} value={section.path}>
            {section.name}
          </Select.Option>
        ))}
      </Select>
    ),
    onOk: async (selectedPath) => {
      message.success(`Page moved to ${selectedPath}`);
    },
  });
};

// Add this function before moreHorizontalData
const handleTurnIntoWiki = async () => {
  try {
    // Get current page data
    const currentPageData = {
      title: document.title,
      content: "", // Get this from your app state
      lastModified: new Date().toISOString(),
    };

    // Here you would typically:
    // 1. Update the page metadata to mark it as a wiki
    // 2. Maybe add additional wiki-specific properties
    const wikiData = {
      ...currentPageData,
      isWiki: true,
      contributors: [], // Array to track wiki contributors
      revisionHistory: [], // Array to track changes
      lastRevision: {
        timestamp: new Date().toISOString(),
        author: "current_user", // Get this from your auth system
        changes: "Converted to wiki",
      },
    };

    // await updatePageToWiki(wikiData);
    message.success("Successfully converted page to wiki");
    return wikiData;
  } catch (error) {
    message.error("Failed to convert page to wiki");
    console.error("Wiki conversion error:", error);
    return null;
  }
};

// Add this function before moreHorizontalData
const openInNewTab = () => {
  try {
    const currentUrl = window.location.href;
    window.open(currentUrl, "_blank");
    message.success("Page opened in new tab");
  } catch (error) {
    message.error("Failed to open page in new tab");
    console.error("Open in new tab error:", error);
  }
};

// Add this function before moreHorizontalData
const handleOpenInSidePeek = async () => {
  try {
    // Create side peek panel
    const sidePeekPanel = document.createElement("div");
    sidePeekPanel.id = "side-peek-panel";
    sidePeekPanel.style.cssText = `
      position: fixed;
      right: 0;
      top: 0;
      width: 400px;
      height: 100%;
      background-color: white;
      box-shadow: -2px 0 8px rgba(0,0,0,0.1);
      z-index: 1000;
      transition: transform 0.3s ease;
    `;

    // Create container for React content
    const editorContainer = document.createElement("div");
    sidePeekPanel.appendChild(editorContainer);
    document.body.appendChild(sidePeekPanel);

    // Create React root and render editor
    const root = createRoot(editorContainer);
    root.render(
      <EditorProvider>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => {
              root.unmount();
              document.getElementById("side-peek-panel").remove();
            }}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              padding: "5px 10px",
              cursor: "pointer",
              zIndex: 1001,
            }}
          >
            ✕
          </button>
          <EditorContainer />
        </div>
      </EditorProvider>
    );

    message.success("Page opened in side peek");
  } catch (error) {
    message.error("Failed to open in side peek");
    console.error("Side peek error:", error);
  }
};

const handleRefresh = async () => {
  try {
    // Reload the current page content
    await window.location.reload();
    message.success("Page refreshed successfully");
  } catch (error) {
    message.error("Failed to refresh page");
    console.error("Refresh error:", error);
  }
};

// Add this function before moreHorizontalData
const handleDeletePage = async () => {
  Modal.confirm({
    title: "Delete Page",
    content: "Are you sure you want to delete this page?",
    okText: "Delete",
    okType: "danger",
    onOk: async () => {
      message.success("Page deleted successfully");
    },
  });
};

// Add this function before moreHorizontalData
const handleAddToFavorites = () => {
  try {
    const currentPath = window.location.pathname;
    const currentTitle = document.title;
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const existingIndex = favorites.findIndex((fav) => fav.id === currentPath);

    if (existingIndex >= 0) {
      // Remove from favorites
      favorites.splice(existingIndex, 1);
      message.success("Removed from favorites");
    } else {
      // Add to favorites
      favorites.push({
        id: currentPath,
        title: currentTitle,
        timestamp: new Date().toISOString(),
      });
      message.success("Added to favorites");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    return true;
  } catch (error) {
    message.error("Failed to update favorites");
    console.error("Favorites error:", error);
    return false;
  }
};

// Move this helper function before moreHorizontalData
const isPageFavorited = () => {
  try {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.some((fav) => fav.id === window.location.pathname);
  } catch (error) {
    console.error("Error reading favorites:", error);
    return false;
  }
};

export const moreHorizontalData = [
  {
    key: "1",
    label: "Add to favorites",
    onClick: handleAddToFavorites,
    icon: (
      <StarOutlined
        style={{ color: isPageFavorited() ? "#FFD700" : undefined }}
      />
    ),
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Copy link",
    onClick: copyLinkToClipboard,
    icon: <LinkOutlined />,
  },
  {
    key: "3",
    label: "Duplicate",
    onClick: duplicatePage,
    icon: <CopyOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "4",
    label: "Rename",
    onClick: handleRename,
    icon: <FormOutlined />,
  },
  {
    key: "5",
    label: "Move to",
    onClick: handleMoveTo,
    icon: <ArrowRightOutlined />,
  },

  {
    type: "divider",
  },
  {
    key: "6",
    label: "Turn into wiki",
    onClick: handleTurnIntoWiki,
    icon: <SwitcherOutlined />,
  },
  {
    key: "7",
    label: "Open in new tab",
    onClick: openInNewTab,
    icon: <PlusOutlined />,
  },
  {
    key: "8",
    label: "Open in side peek",
    onClick: handleOpenInSidePeek,
    icon: <SwitcherOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "9",
    label: "Refresh",
    onClick: handleRefresh,
    icon: <ReloadOutlined />,
  },

  {
    type: "divider",
  },
  {
    key: "10",
    label: "Delete",
    onClick: handleDeletePage,
    icon: <DeleteOutlined />,
  },
];

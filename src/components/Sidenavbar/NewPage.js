import React, { useState } from "react";
import {
  Button,
  Dropdown,
  Tooltip,
  Menu,
  Modal,
  Input,
  message,
  Spin,
  Select,
} from "antd";
import {
  ShareAltOutlined,
  CommentOutlined,
  ClockCircleOutlined,
  StarOutlined,
  MoreOutlined,
  RobotOutlined,
  TableOutlined,
  FormOutlined,
  AppstoreOutlined,
  ArrowLeftOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
  MailOutlined,
  LinkOutlined,
  PlusOutlined,
  DragOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import styles from "../styles/NewPage.module.css";
import EditorContainer from "../Blocksuite_editor/EditorContainer";
import { EditorProvider } from "../Blocksuite_editor/EditorProvider";

import { moreHorizontalData } from "../../data/Morehorizontaldata";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const NewPage = () => {
  const [pageTitle, setPageTitle] = useState("New page");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAIModalVisible, setIsAIModalVisible] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCommentPanelOpen, setIsCommentPanelOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      timestamp: new Date().toISOString(),
      author: "Current User",
      action: "Created document",
      version: "1.0",
      canRestore: true,
    },
    // Add more history items
  ]);

  // Header actions
  const handleShare = () => {
    const currentUrl = window.location.href;
    const title = pageTitle;

    const shareLinks = [
      {
        key: "copy",
        label: "Copy Link",
        icon: <LinkOutlined />,
        onClick: () => {
          navigator.clipboard.writeText(currentUrl);
          message.success("Link copied to clipboard!");
        },
      },
      {
        key: "twitter",
        label: "Twitter",
        icon: <TwitterOutlined />,
        onClick: () => {
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              title
            )}&url=${encodeURIComponent(currentUrl)}`,
            "_blank"
          );
        },
      },
      {
        key: "facebook",
        label: "Facebook",
        icon: <FacebookOutlined />,
        onClick: () => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentUrl
            )}`,
            "_blank"
          );
        },
      },
      {
        key: "linkedin",
        label: "LinkedIn",
        icon: <LinkedinOutlined />,
        onClick: () => {
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              currentUrl
            )}`,
            "_blank"
          );
        },
      },
      {
        key: "whatsapp",
        label: "WhatsApp",
        icon: <WhatsAppOutlined />,
        onClick: () => {
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(
              title + " " + currentUrl
            )}`,
            "_blank"
          );
        },
      },
      {
        key: "email",
        label: "Email",
        icon: <MailOutlined />,
        onClick: () => {
          window.location.href = `mailto:?subject=${encodeURIComponent(
            title
          )}&body=${encodeURIComponent(currentUrl)}`;
        },
      },
    ];

    return <Menu items={shareLinks} />;
  };

  const handleHistory = () => {
    setIsHistoryModalVisible(true);
    // Fetch history data if needed
    // fetchDocumentHistory();
  };

  const handleRestoreVersion = (version) => {
    Modal.confirm({
      title: "Restore Version",
      content: `Are you sure you want to restore version ${version}?`,
      onOk() {
        // Implement version restore logic
        message.success(`Restored to version ${version}`);
      },
    });
  };

  const handleMore = () => {
    const items = [...moreHorizontalData];

    return (
      <Menu
        items={items}
        onClick={({ key }) => {
          switch (key) {
            case "duplicate":
              // Handle duplicate
              console.log("Duplicating page...");
              break;
            case "move":
              // Handle move
              console.log("Moving page...");
              break;
            case "export":
              // Handle export
              console.log("Exporting page...");
              break;
            case "delete":
              // Handle delete
              console.log("Deleting page...");
              break;
            default:
              break;
          }
        }}
      />
    );
  };

  return (
    <EditorProvider>
      <div className={styles.newPageContainer} style={{ width: "100%" }}>
        {/* Header */}
        <header className={styles.pageHeader}>
          <div className={styles.leftSectionHeader}>
            <div className={styles.leftSection}>
              <Button icon={<ArrowLeftOutlined />} type="text" />

              <div className={styles.addNewPage}>
                <span>Add to</span>
                <Button>New page</Button>
              </div>
            </div>
          </div>

          <div className={styles.rightSection}>
            <Dropdown
              overlay={handleShare()}
              trigger={["click"]}
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            >
              <Button icon={<ShareAltOutlined />}>Share</Button>
            </Dropdown>

            <Tooltip title="History">
              <Button
                icon={<ClockCircleOutlined />}
                type="text"
                onClick={handleHistory}
              />
            </Tooltip>

            <Dropdown
              overlay={handleMore()}
              trigger={["click"]}
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
            >
              <Button icon={<MoreOutlined />} type="text" />
            </Dropdown>
            <Tooltip title="Close">
              <Button
                icon={<CloseOutlined />}
                type="text"
                onClick={() => {
                  window.history.back();
                }}
              />
            </Tooltip>
          </div>
        </header>
        <div className={styles.editorContent}>
          <EditorContainer style={{ height: "100%" }} />
          {isCommentPanelOpen && (
            <div className={styles.commentPanel}>
              <div className={styles.commentHeader}>
                <h3>Comments</h3>
                <Button
                  type="primary"
                  onClick={handleAddComment}
                  icon={<PlusOutlined />}
                >
                  Add Comment
                </Button>
              </div>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="comments">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={styles.commentsList}
                    >
                      {comments.map((comment, index) => (
                        <Draggable
                          key={comment.id}
                          draggableId={comment.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.commentItem}
                            >
                              <div className={styles.commentDragHandle}>
                                <DragOutlined />
                              </div>
                              <div className={styles.commentContent}>
                                <EditorContainer
                                  key={comment.id}
                                  style={{
                                    height: "150px",
                                    border: "1px solid #e8e8e8",
                                    borderRadius: "4px",
                                    padding: "8px",
                                  }}
                                />
                                <div className={styles.commentMeta}>
                                  {new Date(comment.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          )}
        </div>
        <Modal
          title="Document History"
          open={isHistoryModalVisible}
          onCancel={() => setIsHistoryModalVisible(false)}
          footer={null}
          width={600}
        >
          <div className={styles.historyHeader}>
            <Input.Search
              placeholder="Search history"
              style={{ width: 200, marginBottom: 16 }}
            />
            <Select defaultValue="all" style={{ width: 120, marginLeft: 8 }}>
              <Select.Option value="all">All Changes</Select.Option>
              <Select.Option value="major">Major Changes</Select.Option>
              <Select.Option value="minor">Minor Changes</Select.Option>
            </Select>
          </div>
          <div className={styles.historyContainer}>
            {historyItems.map((item) => (
              <div key={item.id} className={styles.historyItem}>
                <div className={styles.historyItemHeader}>
                  <span className={styles.historyItemAuthor}>
                    {item.author}
                  </span>
                  <span className={styles.historyItemTime}>
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className={styles.historyItemContent}>
                  <div className={styles.historyItemAction}>
                    {item.action}
                    <span className={styles.historyItemVersion}>
                      v{item.version}
                    </span>
                  </div>
                  {item.canRestore && (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => handleRestoreVersion(item.version)}
                    >
                      Restore this version
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </EditorProvider>
  );
};

export default NewPage;

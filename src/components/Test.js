import React, { useState } from "react";
import { Collapse, Row, Col, Button, Menu } from "antd";
import "./Test.css"; // Import the CSS file for styling

const { Panel } = Collapse;

const Test = () => {
  const [sections, setSections] = useState([
    { id: 1, title: "Section 1", children: [] },
    { id: 2, title: "Section 23", children: [] },
  ]);
  const [activeKey, setActiveKey] = useState([]); // Keeps track of open panels
  const [selectedPage, setSelectedPage] = useState(null); // Active Pagefor details

  const addChild = (id) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id
          ? {
              ...section,
              children: [
                ...section.children,
                `Page${section.children.length + 1}`,
              ],
            }
          : section
      )
    );

    // Ensure the section remains open
    if (!activeKey.includes(id)) {
      setActiveKey((prev) => [...prev, id]);
    }
  };

  const handleMenuClick = (Page) => {
    setSelectedPage(Page);
  };

  return (
    <Row gutter={16}>
      {/* Left Section with Collapse */}
      <Col span={28}>
        <Collapse
          activeKey={activeKey} // Dynamically control which panels are open
          onChange={(keys) => setActiveKey(keys)}
        >
          {sections.map((section) => (
            <Panel
              key={section.id}
              className="collapse-panel"
              header={
                <div className="collapse-panel-header">
                  <span>{section.title}</span>
                  <Button
                    type="link"
                    className="collapse-panel-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent Collapse from toggling
                      addChild(section.id);
                    }}
                  >
                    +
                  </Button>
                </div>
              }
            >
              {/* Render Children as Menu Items */}
              <Menu mode="inline">
                {section.children.map((child, index) => (
                  <Menu.Item
                    key={`${section.id}-child-${index}`}
                    onClick={() =>
                      handleMenuClick(`${child} of ${section.title}`)
                    }
                  >
                    {child}
                  </Menu.Item>
                ))}
              </Menu>
            </Panel>
          ))}
        </Collapse>
      </Col>

      {/* Right Section for PageDetails */}
      <Col span={16}>
        {selectedPage ? (
          <div className="details-panel">
            <h3>{selectedPage}</h3>
            <p>Details for {selectedPage}.</p>
          </div>
        ) : (
          <div className="details-panel details-placeholder">
            Select a Pageto view details
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Test;

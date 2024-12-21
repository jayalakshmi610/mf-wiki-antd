import React from "react";
import { useEffect, useRef } from "react";
import { useEditor } from "./editor/context";
import styles from "./EditorContainer.module.css";
import { Layout } from "antd";

const EditorContainer: React.FC = () => {
  const { editor } = useEditor()!;

  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorContainerRef.current && editor) {
      if (editorContainerRef.current.firstChild !== editor) {
        editorContainerRef.current.innerHTML = "";
        editorContainerRef.current.appendChild(editor);
      }
    }
  }, [editor]);

  return (
    <Layout className="h-full bg-transparent">
      <Layout.Content>
        <div className={styles.editorContainer} ref={editorContainerRef}></div>
      </Layout.Content>
    </Layout>
  );
};

export default EditorContainer;

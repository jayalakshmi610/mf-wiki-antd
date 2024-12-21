import React, { useState, useRef, useEffect } from "react";
import { Plus, Table, Layout, FileText, MoreHorizontal } from "lucide-react";
import { useDocumentStore } from "../store/documentStore";
import { toast } from "react-hot-toast";
import { TemplateMenu } from "./TemplateMenu";

const PageCreator = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { createDocument } = useDocumentStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (isOpen || showTemplates) {
          setIsOpen(false);
          setShowTemplates(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, showTemplates]);

  const handleCreatePage = (type: "blank" | "table" | "form") => {
    const templates = {
      blank: {
        title: "Untitled",
        type: "document",
        content: "",
      },
      table: {
        title: "New Table",
        type: "table",
        content: {
          columns: [
            { id: "name", title: "Name", type: "text" },
            { id: "status", title: "Status", type: "select" },
            { id: "date", title: "Date", type: "date" },
          ],
          rows: [],
        },
      },
      form: {
        title: "New Form",
        type: "form",
        content: {
          fields: [
            { type: "text", label: "Name", required: true },
            { type: "email", label: "Email", required: true },
            { type: "textarea", label: "Message" },
          ],
        },
      },
    };

    const template = templates[type];
    createDocument(template);
    toast.success(`Created new ${type} page`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef} style={{ cursor: "pointer" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
        aria-label="Create new page"
      >
        <Plus className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            <div className="space-y-1">
              <button
                onClick={() => handleCreatePage("blank")}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-gray-600" />
                <span>Empty page</span>
              </button>

              <button
                onClick={() => handleCreatePage("table")}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
              >
                <Table className="w-4 h-4 text-gray-600" />
                <span>Table</span>
              </button>

              <button
                onClick={() => handleCreatePage("form")}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
              >
                <Layout className="w-4 h-4 text-gray-600" />
                <span>Form</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    <span>More templates...</span>
                  </div>
                </button>
                {showTemplates && (
                  <TemplateMenu onClose={() => setShowTemplates(false)} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageCreator;

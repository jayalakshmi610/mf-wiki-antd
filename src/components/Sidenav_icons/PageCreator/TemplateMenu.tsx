import React from "react";
import {
  Briefcase,
  Calendar,
  CheckSquare,
  Users,
  Book,
  Coffee,
  Lightbulb,
} from "lucide-react";
import { useDocumentStore } from "../store/documentStore";
import { toast } from "react-hot-toast";

const templates = [
  {
    id: "meeting-notes",
    icon: Calendar,
    title: "Meeting Notes",
    description: "Template for organizing meeting agendas and notes",
    content: {
      sections: [
        { title: "Attendees", type: "bullet-list" },
        { title: "Agenda", type: "numbered-list" },
        { title: "Discussion", type: "text" },
        { title: "Action Items", type: "todo-list" },
      ],
    },
  },
  {
    id: "project-tracker",
    icon: Briefcase,
    title: "Project Tracker",
    description: "Track project progress and milestones",
    content: {
      sections: [
        { title: "Overview", type: "text" },
        { title: "Timeline", type: "timeline" },
        { title: "Tasks", type: "kanban" },
        { title: "Resources", type: "table" },
      ],
    },
  },
  {
    id: "team-wiki",
    icon: Users,
    title: "Team Wiki",
    description: "Central knowledge base for your team",
    content: {
      sections: [
        { title: "Team Members", type: "gallery" },
        { title: "Processes", type: "nested-list" },
        { title: "Resources", type: "links" },
        { title: "FAQs", type: "toggle-list" },
      ],
    },
  },
  {
    id: "weekly-planner",
    icon: CheckSquare,
    title: "Weekly Planner",
    description: "Organize your week with this structured template",
    content: {
      sections: [
        { title: "Goals", type: "bullet-list" },
        { title: "Schedule", type: "table" },
        { title: "Tasks", type: "todo-list" },
        { title: "Notes", type: "text" },
      ],
    },
  },
  {
    id: "learning-journal",
    icon: Book,
    title: "Learning Journal",
    description: "Track your learning progress",
    content: {
      sections: [
        { title: "Topics", type: "bullet-list" },
        { title: "Resources", type: "links" },
        { title: "Notes", type: "text" },
        { title: "Progress", type: "table" },
      ],
    },
  },
  {
    id: "habit-tracker",
    icon: Coffee,
    title: "Habit Tracker",
    description: "Monitor and build better habits",
    content: {
      sections: [
        { title: "Goals", type: "bullet-list" },
        { title: "Daily Log", type: "table" },
        { title: "Progress", type: "chart" },
        { title: "Reflections", type: "text" },
      ],
    },
  },
  {
    id: "brainstorming",
    icon: Lightbulb,
    title: "Brainstorming",
    description: "Capture and organize ideas",
    content: {
      sections: [
        { title: "Topic", type: "heading" },
        { title: "Ideas", type: "mindmap" },
        { title: "Notes", type: "text" },
        { title: "Action Items", type: "todo-list" },
      ],
    },
  },
];

interface TemplateMenuProps {
  onClose: () => void;
}

export function TemplateMenu({ onClose }: TemplateMenuProps) {
  const { createDocument } = useDocumentStore();

  const handleSelectTemplate = (template: (typeof templates)[0]) => {
    createDocument({
      title: template.title,
      type: "template",
      content: template.content,
      template: template.id,
    });
    toast.success(`Created new ${template.title} page`);
    onClose();
  };

  return (
    <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Templates</h3>
        <div className="space-y-2">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className="w-full text-left p-3 rounded hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {template.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {template.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

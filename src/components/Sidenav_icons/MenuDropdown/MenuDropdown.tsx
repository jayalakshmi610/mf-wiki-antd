import React, { useState, useRef, useEffect } from "react";
import {
  MoreHorizontal,
  Star,
  Link,
  Copy,
  Pencil,
  ArrowRight,
  Trash2,
  RefreshCw,
  ExternalLink,
  SidebarOpen,
} from "lucide-react";
import { MenuItem } from "./MenuItem";
import { MenuSection } from "./MenuSection";
import { MenuFooter } from "./MenuFooter";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useMenuActions } from "./hooks/useMenuActions";
import { MoveDialog } from "../MoveDialog/MoveDialog";
import { WikiEditor } from "../WikiEditor/WikiEditor";
import { useDocumentStore } from "../store/documentStore";
import { Toaster } from "react-hot-toast";

interface MenuDropdownProps {
  documentTitle: string;
  onRename: (newTitle: string) => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  onToggleSidePeek: () => void;
}

export function MenuDropdown({
  documentTitle,
  onRename,
  onToggleFavorite,
  isFavorite,
  onToggleSidePeek,
}: MenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const { currentDocument, currentUser } = useDocumentStore();

  const {
    handleAddToFavorites,
    handleCopyLink,
    handleDuplicate,
    handleRename,
    handleMoveTo,
    handleMoveToLocation,
    handleMoveToTrash,
    handleTurnIntoWiki,
    handleOpenInNewTab,
    handleOpenInSidePeek,
    showMoveDialog,
    setShowMoveDialog,
    showWikiEditor,
    setShowWikiEditor,
  } = useMenuActions({
    documentTitle,
    onRename,
    onToggleFavorite,
    isFavorite,
    onToggleSidePeek,
    onClose: () => setIsOpen(false),
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useKeyboardShortcuts({
    onDuplicate: handleDuplicate,
    onRename: handleRename,
    onMoveTo: handleMoveTo,
    onOpenNewTab: handleOpenInNewTab,
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => console.log("clicked")}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
          aria-label="More options"
        >
          <MoreHorizontal className="w-4 h-4 d-flex text-center text-gray-400" />
        </button>

        {isOpen && (
          <div className=" left-80 mt-2 w-80 bg-green-500 rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              <MenuSection>
                <MenuItem
                  icon={Star}
                  text={
                    isFavorite ? "Remove from Favorites" : "Add to Favorites"
                  }
                  onClick={handleAddToFavorites}
                />
              </MenuSection>

              <MenuSection>
                <MenuItem
                  icon={Link}
                  text="Copy link"
                  onClick={handleCopyLink}
                />
                <MenuItem
                  icon={Copy}
                  text="Duplicate"
                  shortcut="Ctrl+D"
                  onClick={handleDuplicate}
                />
                <MenuItem
                  icon={Pencil}
                  text="Rename"
                  shortcut="Ctrl+⇧+R"
                  onClick={handleRename}
                />
                <MenuItem
                  icon={ArrowRight}
                  text="Move to"
                  shortcut="Ctrl+⇧+P"
                  onClick={handleMoveTo}
                />
                <MenuItem
                  icon={Trash2}
                  text="Move to Trash"
                  textColor="text-red-600"
                  iconColor="text-red-600"
                  onClick={handleMoveToTrash}
                />
              </MenuSection>

              <MenuSection>
                <MenuItem
                  icon={RefreshCw}
                  text="Turn into wiki"
                  onClick={handleTurnIntoWiki}
                />
              </MenuSection>

              <MenuSection>
                <MenuItem
                  icon={ExternalLink}
                  text="Open in new tab"
                  shortcut="Ctrl+⇧+↵"
                  onClick={handleOpenInNewTab}
                />
                <MenuItem
                  icon={SidebarOpen}
                  text="Open in side peek"
                  shortcut="Alt+Click"
                  onClick={handleOpenInSidePeek}
                />
              </MenuSection>

              <MenuFooter
                editor={currentUser.name}
                lastEditedAt={currentDocument?.lastEditedAt}
              />
            </div>
          </div>
        )}
      </div>

      {showMoveDialog && (
        <MoveDialog
          onClose={() => setShowMoveDialog(false)}
          onMove={handleMoveToLocation}
        />
      )}

      {showWikiEditor && currentDocument && (
        <WikiEditor
          documentId={currentDocument.id}
          onClose={() => setShowWikiEditor(false)}
        />
      )}

      <Toaster position="bottom-right" />
    </>
  );
}

import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useDocumentStore } from "../../store/documentStore";

export function useMenuActions({
  documentTitle,
  onRename,
  onToggleFavorite,
  isFavorite,
  onToggleSidePeek,
  onClose,
}: UseMenuActionsProps) {
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [showWikiEditor, setShowWikiEditor] = useState(false);

  const {
    currentDocument,
    duplicateDocument,
    moveDocument,
    convertToWiki,
    updateLastEdited,
  } = useDocumentStore();

  const handleAddToFavorites = useCallback(() => {
    onToggleFavorite();
    updateLastEdited(currentDocument?.id || "");
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
    onClose();
  }, [
    isFavorite,
    onToggleFavorite,
    onClose,
    currentDocument,
    updateLastEdited,
  ]);

  const handleCopyLink = useCallback(() => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast.success("Link copied to clipboard");
    onClose();
  }, [onClose]);

  const handleDuplicate = useCallback(() => {
    if (currentDocument) {
      const newDoc = duplicateDocument(currentDocument, currentDocument.path);
      toast.success(`Document duplicated: ${newDoc.title}`);
      onClose();
    }
  }, [currentDocument, duplicateDocument, onClose]);

  const handleRename = useCallback(() => {
    const newName = prompt("Enter new name:", documentTitle);
    if (newName && newName.trim() !== "") {
      onRename(newName.trim());
      updateLastEdited(currentDocument?.id || "");
      toast.success("Document renamed");
      onClose();
    }
  }, [documentTitle, onRename, onClose, currentDocument, updateLastEdited]);

  const handleMoveTo = useCallback(() => {
    setShowMoveDialog(true);
  }, []);

  const handleMoveToLocation = useCallback(
    (targetPath) => {
      if (currentDocument) {
        moveDocument(currentDocument.id, targetPath);
        toast.success(`Moved to ${targetPath.join("/")}`);
        setShowMoveDialog(false);
        onClose();
      }
    },
    [currentDocument, moveDocument, onClose]
  );

  const handleMoveToTrash = useCallback(() => {
    const confirmed = window.confirm(
      "Are you sure you want to move this to trash?"
    );
    if (confirmed && currentDocument) {
      moveDocument(currentDocument.id, ["Trash"]);
      toast.success("Moved to trash");
      onClose();
    }
  }, [currentDocument, moveDocument, onClose]);

  const handleTurnIntoWiki = useCallback(() => {
    if (currentDocument) {
      convertToWiki(currentDocument.id);
      setShowWikiEditor(true);
      onClose();
    }
  }, [currentDocument, convertToWiki, onClose]);

  const handleOpenInNewTab = useCallback(() => {
    window.open(window.location.href, "_blank");
    onClose();
  }, [onClose]);

  const handleOpenInSidePeek = useCallback(() => {
    onToggleSidePeek();
    onClose();
  }, [onToggleSidePeek, onClose]);

  return {
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
  };
}

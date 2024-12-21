import { toast } from 'react-hot-toast';

export const addToFavorites = () => {
  // In a real app, this would interact with a backend
  toast.success('Added to favorites');
};

export const copyLink = () => {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl);
  toast.success('Link copied to clipboard');
};

export const duplicateDocument = () => {
  // In a real app, this would clone the current document
  toast.success('Document duplicated');
};

export const renameDocument = () => {
  const newName = prompt('Enter new name:');
  if (newName) {
    // In a real app, this would update the document name
    toast.success(`Renamed to: ${newName}`);
  }
};

export const moveDocument = () => {
  // In a real app, this would show a folder selection dialog
  toast.success('Move dialog opened');
};

export const moveToTrash = () => {
  const confirmed = window.confirm('Are you sure you want to move this to trash?');
  if (confirmed) {
    // In a real app, this would move the document to trash
    toast.success('Moved to trash');
  }
};

export const turnIntoWiki = () => {
  // In a real app, this would convert the document to a wiki
  toast.success('Converted to wiki');
};

export const openInNewTab = () => {
  window.open(window.location.href, '_blank');
};

export const openInSidePeek = () => {
  // In a real app, this would open the document in a side panel
  toast.success('Opened in side peek');
};
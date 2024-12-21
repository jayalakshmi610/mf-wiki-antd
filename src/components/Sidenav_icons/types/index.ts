export interface Document {
  id: string;
  title: string;
  content: any;
  path: string[];
  lastEditedBy: string;
  lastEditedAt: Date;
  type: 'document' | 'table' | 'form' | 'template' | 'wiki';
  isWiki?: boolean;
  template?: string;
}

export interface Folder {
  id: string;
  name: string;
  path: string[];
  documents: Document[];
  subfolders: Folder[];
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}
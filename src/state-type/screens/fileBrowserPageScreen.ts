export type FileBrowserItemType = 'folder' | 'file' | 'parent';

export type FileBrowserSearchMode = 'folder' | 'global';

export interface FileBrowserPageSelectedItem {
	id: string;
	type: FileBrowserItemType;
}

export interface FileBrowserPageScreenState {
	currentPath: string;
	currentFolderId: string | null;
	selectedItem: FileBrowserPageSelectedItem | null;
	searchMode: FileBrowserSearchMode | null;
	searchQuery: string;
}

export interface FileBrowserPageScreenActions {
	setCurrentFolderId: (currentFolderId: string | null) => void;
	setSelectedItem: (selectedItem: FileBrowserPageSelectedItem | null) => void;
	setSearchMode: (searchMode: FileBrowserSearchMode) => void;
	setSearchQuery: (searchQuery: string) => void;
	exitSearchMode: () => void;
	navigateTo: (path: string) => void;
	createFolder: () => Promise<void>;
	createFile: () => Promise<void>;
	deleteSelectedItem: () => Promise<void>;
}

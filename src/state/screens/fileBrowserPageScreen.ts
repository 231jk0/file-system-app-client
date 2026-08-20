import { deleteFile } from '@/src/api/files/delete';
import { createFile } from '@/src/api/files/post';
import { deleteFolder } from '@/src/api/folders/delete';
import { createFolder } from '@/src/api/folders/post';
import { zustandState } from '@/src/state/state';
import { FileBrowserPageScreenActions, FileBrowserPageScreenState } from '@/src/state-type/screens/fileBrowserPageScreen';
import { StoreStateGetter, StoreStateSetter } from '@/src/state-type/state-type';
import { toast } from '@/src/utilities/system/toast';

const promptForName = (title: string, onConfirm: (name: string) => Promise<void>) => {
	zustandState().actions.modals.editTextAreaModal.setEditTextAreaModal({
		title,
		initialValue: '',
		onConfirm: async value => {
			const name = value.trim();

			if (!name) {
				return;
			}

			try {
				await onConfirm(name);
			} catch (error) {
				toast({
					message: error instanceof Error ? error.message : 'Request failed',
					severity: 'error',
				});
			}
		},
		onCleanup: () => {
			zustandState().actions.modals.showModal([]);
		},
	});
	zustandState().actions.modals.showModal([ 'EDIT_TEXT_AREA' ]);
};

export const fileBrowserPageScreenState: FileBrowserPageScreenState = {
	currentPath: '/',
	currentFolderId: null,
	selectedItem: null,
	searchMode: null,
	searchQuery: '',
};

export const fileBrowserPageScreenActions = (set: StoreStateSetter, get: StoreStateGetter): FileBrowserPageScreenActions => {
	return {
		setCurrentFolderId: (currentFolderId: string | null) => {
			set(state => {
				state.screens.fileBrowserPageScreen.currentFolderId = currentFolderId;
			});
		},
		setSelectedItem: selectedItem => {
			set(state => {
				state.screens.fileBrowserPageScreen.selectedItem = selectedItem;
			});
		},
		setSearchMode: searchMode => {
			set(state => {
				state.screens.fileBrowserPageScreen.searchMode = searchMode;
				state.screens.fileBrowserPageScreen.searchQuery = '';
				state.screens.fileBrowserPageScreen.selectedItem = null;
			});
		},
		setSearchQuery: searchQuery => {
			set(state => {
				state.screens.fileBrowserPageScreen.searchQuery = searchQuery;
			});
		},
		exitSearchMode: () => {
			set(state => {
				state.screens.fileBrowserPageScreen.searchMode = null;
				state.screens.fileBrowserPageScreen.searchQuery = '';
			});
		},
		navigateTo: (path: string) => {
			set(state => {
				state.screens.fileBrowserPageScreen.currentPath = path;
				state.screens.fileBrowserPageScreen.selectedItem = null;
				state.screens.fileBrowserPageScreen.searchMode = null;
				state.screens.fileBrowserPageScreen.searchQuery = '';
			});
		},
		createFolder: async () => {
			const { currentFolderId } = get().screens.fileBrowserPageScreen;

			promptForName('Enter folder name', async name => {
				await createFolder({
					name,
					parentId: currentFolderId,
				});
			});
		},
		createFile: async () => {
			const { currentFolderId } = get().screens.fileBrowserPageScreen;

			promptForName('Enter file name', async name => {
				await createFile({
					name,
					folderId: currentFolderId,
				});
			});
		},
		deleteSelectedItem: async () => {
			const { selectedItem } = get().screens.fileBrowserPageScreen;

			if (!selectedItem || selectedItem.type === 'parent') {
				return;
			}

			const isFolder = selectedItem.type === 'folder';
			const itemId = selectedItem.id;

			zustandState().actions.modals.confirmActionModal.setConfirmAction({
				title: 'Delete item?',
				text: isFolder
					? 'Are you sure you want to delete this folder and all its contents?'
					: 'Are you sure you want to delete this file?',
				primaryButtonText: 'Cancel',
				secondaryButtonText: 'Delete',
				onConfirm: async () => {
					try {
						if (isFolder) {
							await deleteFolder(itemId);
						} else {
							await deleteFile(itemId);
						}

						set(state => {
							state.screens.fileBrowserPageScreen.selectedItem = null;
						});
					} catch (error) {
						toast({
							message: error instanceof Error ? error.message : 'Failed to delete item',
							severity: 'error',
						});
					}
				},
			});
			zustandState().actions.modals.showModal([ 'CONFIRM_ACTION' ]);
		},
	};
};

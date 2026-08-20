import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Box, CircularProgress, Divider, ListItemIcon, Menu, MenuItem, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';

import FileBrowserItem from './FileBrowserItem';
import SearchResults from './SearchResults';

import { useGetFolderContents } from '@/src/api/browse/get';
import { useStore } from '@/src/state/state';
import { FileBrowserItemType } from '@/src/state-type/screens/fileBrowserPageScreen';
import { getParentPath } from '@/src/utilities/folderPathNavigation';
import { useFolderNavigation } from '@/src/utilities/navigation/useFolderNavigation';

type ContextMenuPosition = {
	mouseX: number;
	mouseY: number;
};

const FileBrowser = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { currentPath, navigateToFolder } = useFolderNavigation();
	const selectedItem = useStore(state => state.screens.fileBrowserPageScreen.selectedItem);
	const setSelectedItem = useStore(state => state.actions.fileBrowserPageScreen.setSelectedItem);
	const setCurrentFolderId = useStore(state => state.actions.fileBrowserPageScreen.setCurrentFolderId);
	const createFolder = useStore(state => state.actions.fileBrowserPageScreen.createFolder);
	const createFile = useStore(state => state.actions.fileBrowserPageScreen.createFile);
	const deleteSelectedItem = useStore(state => state.actions.fileBrowserPageScreen.deleteSelectedItem);
	const searchMode = useStore(state => state.screens.fileBrowserPageScreen.searchMode);
	const searchQuery = useStore(state => state.screens.fileBrowserPageScreen.searchQuery);

	const [ contextMenu, setContextMenu ] = useState<ContextMenuPosition | null>(null);

	const { data: folderContents, isLoading, isError, error } = useGetFolderContents(currentPath);
	const currentFolderId = folderContents?.folder?.id ?? null;

	useEffect(() => {
		setCurrentFolderId(currentFolderId);
	}, [ currentFolderId, setCurrentFolderId ]);

	const handleSelect = useCallback((id: string, type: FileBrowserItemType) => {
		setSelectedItem({
			id,
			type,
		});
	}, [ setSelectedItem ]);

	const handleItemDoubleClick = useCallback((type: FileBrowserItemType, path?: string) => {
		if (type === 'folder' && path) {
			navigateToFolder(path);
		}

		if (type === 'parent') {
			const parentPath = getParentPath(currentPath);

			if (parentPath) {
				navigateToFolder(parentPath);
			}
		}
	}, [ currentPath, navigateToFolder ]);

	const handleItemClick = useCallback(async (id: string, type: FileBrowserItemType, path?: string) => {
		if (isMobile && (type === 'folder' || type === 'parent')) {
			handleSelect(id, type);
			await new Promise(resolve => setTimeout(resolve, 100));
			handleItemDoubleClick(type, path);

			return;
		}

		handleSelect(id, type);
	}, [ handleItemDoubleClick, handleSelect, isMobile ]);

	const handleContextMenu = useCallback((event: React.MouseEvent) => {
		event.preventDefault();
		setContextMenu({
			mouseX: event.clientX,
			mouseY: event.clientY,
		});
	}, []);

	const handleItemContextMenu = useCallback((event: React.MouseEvent, id: string, type: FileBrowserItemType) => {
		event.preventDefault();
		event.stopPropagation();
		setSelectedItem({
			id,
			type,
		});
		setContextMenu({
			mouseX: event.clientX,
			mouseY: event.clientY,
		});
	}, [ setSelectedItem ]);

	const handleCloseContextMenu = useCallback(() => {
		setContextMenu(null);
	}, []);

	const handleCreateFolder = useCallback(async () => {
		handleCloseContextMenu();
		await createFolder();
	}, [ createFolder, handleCloseContextMenu ]);

	const handleCreateFile = useCallback(async () => {
		handleCloseContextMenu();
		await createFile();
	}, [ createFile, handleCloseContextMenu ]);

	const handleDeleteSelectedItem = useCallback(async () => {
		handleCloseContextMenu();
		await deleteSelectedItem();
	}, [ deleteSelectedItem, handleCloseContextMenu ]);

	const canDeleteSelectedItem = selectedItem?.type === 'folder' || selectedItem?.type === 'file';
	const parentPath = getParentPath(currentPath);
	const searchModeLabel = searchMode === 'folder'
		? `Searching files in folder ${folderContents?.path ?? currentPath}`
		: 'Searching all files';

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 1,
			}}
		>
			<Paper
				elevation={0}
				sx={{
					border: 1,
					borderColor: 'divider',
					px: '12px',
					py: '8px',
				}}
				variant="outlined"
			>
				<Typography
					noWrap
					variant="body2"
				>
					{searchMode ? searchModeLabel : (folderContents?.path ?? currentPath)}
				</Typography>
			</Paper>

			{searchMode
				? (
					<SearchResults
						folderId={currentFolderId}
						folderReady={!isLoading && !isError}
						searchMode={searchMode}
						searchQuery={searchQuery}
					/>
				)
				: (
					<Paper
						elevation={0}
						sx={{
							border: 1,
							borderColor: 'divider',
							minHeight: 320,
							overflow: 'auto',
							py: '4px',
						}}
						variant="outlined"
						onContextMenu={handleContextMenu}
					>
						{isLoading && (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									py: 4,
								}}
							>
								<CircularProgress size={28} />
							</Box>
						)}

						{isError && (
							<Typography
								color="error"
								sx={{
									px: '8px',
									py: '16px',
								}}
								variant="body2"
							>
								{error instanceof Error ? error.message : 'Failed to load folder contents'}
							</Typography>
						)}

						{!isLoading && !isError && (
							<>
								{parentPath && (
									<FileBrowserItem
										name=".."
										selected={selectedItem?.id === '..' && selectedItem.type === 'parent'}
										type="parent"
										onClick={() => handleItemClick('..', 'parent')}
										onDoubleClick={() => handleItemDoubleClick('parent')}
									/>
								)}

								{folderContents?.subfolders.map(folder => (
									<FileBrowserItem
										key={folder.id}
										name={folder.name}
										selected={selectedItem?.id === folder.id && selectedItem.type === 'folder'}
										type="folder"
										onClick={() => handleItemClick(folder.id, 'folder', folder.path)}
										onContextMenu={event => handleItemContextMenu(event, folder.id, 'folder')}
										onDoubleClick={() => handleItemDoubleClick('folder', folder.path)}
									/>
								))}

								{folderContents?.files.map(file => (
									<FileBrowserItem
										key={file.id}
										name={file.name}
										selected={selectedItem?.id === file.id && selectedItem.type === 'file'}
										type="file"
										onClick={() => handleItemClick(file.id, 'file')}
										onContextMenu={event => handleItemContextMenu(event, file.id, 'file')}
									/>
								))}

								{folderContents
								&& parentPath === null
								&& folderContents.subfolders.length === 0
								&& folderContents.files.length === 0 && (
									<Typography
										color="text.secondary"
										sx={{
											px: '8px',
											py: '16px',
										}}
										variant="body2"
									>
										This folder is empty.
									</Typography>
								)}
							</>
						)}
					</Paper>
				)}

			{!searchMode && (
				<Menu
					anchorPosition={
						contextMenu
							? {
								top: contextMenu.mouseY,
								left: contextMenu.mouseX,
							}
							: undefined
					}
					anchorReference="anchorPosition"
					open={contextMenu !== null}
					onClose={handleCloseContextMenu}
				>
					<MenuItem onClick={handleCreateFolder}>
						<ListItemIcon>
							<CreateNewFolderIcon fontSize="small" />
						</ListItemIcon>
						Create New Folder
					</MenuItem>

					<MenuItem onClick={handleCreateFile}>
						<ListItemIcon>
							<NoteAddIcon fontSize="small" />
						</ListItemIcon>
						Create New File
					</MenuItem>

					{canDeleteSelectedItem && (
						<>
							<Divider />
							<MenuItem onClick={handleDeleteSelectedItem}>
								<ListItemIcon>
									<DeleteIcon fontSize="small" />
								</ListItemIcon>
								{selectedItem?.type === 'folder' ? 'Delete Folder' : 'Delete File'}
							</MenuItem>
						</>
					)}
				</Menu>
			)}
		</Box>
	);
};

export default memo(FileBrowser);

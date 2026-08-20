import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase } from '@mui/material';
import { useMemo, useState } from 'react';

import AppBar from '@/src/components/AppBar/AppBar';
import { AppbarIconButton } from '@/src/components/AppBar/AppbarIconButton';
import { AppbarMoreIconButton, MenuItem } from '@/src/components/AppBar/AppbarMoreIconButton';
import OpenMenuButton from '@/src/components/AppBar/OpenMenuButton';
import ToolbarTitle from '@/src/components/AppBar/ToolbarTitle';
import { useStore } from '@/src/state/state';
import { useCustomKeyMapping } from '@/src/utilities/keybindings/useCustomKeyMapping';
import { useBackHandler } from '@/src/utilities/navigation/useBackHandler';

export default function FileBrowserAppBar() {
	const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);
	const createFolder = useStore(state => state.actions.fileBrowserPageScreen.createFolder);
	const createFile = useStore(state => state.actions.fileBrowserPageScreen.createFile);
	const deleteSelectedItem = useStore(state => state.actions.fileBrowserPageScreen.deleteSelectedItem);
	const setSearchMode = useStore(state => state.actions.fileBrowserPageScreen.setSearchMode);
	const setSearchQuery = useStore(state => state.actions.fileBrowserPageScreen.setSearchQuery);
	const exitSearchMode = useStore(state => state.actions.fileBrowserPageScreen.exitSearchMode);
	const selectedItem = useStore(state => state.screens.fileBrowserPageScreen.selectedItem);
	const searchMode = useStore(state => state.screens.fileBrowserPageScreen.searchMode);
	const searchQuery = useStore(state => state.screens.fileBrowserPageScreen.searchQuery);

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	useCustomKeyMapping(() => {
	});

	const menuItems = useMemo((): MenuItem[] => {
		const items: MenuItem[] = [
			{
				type: 'item',
				label: 'Add Folder',
				icon: <CreateNewFolderIcon sx={{ mr: 1 }} />,
				onClick: () => {
					handleCloseMenu();
					void createFolder();
				},
			},
			{
				type: 'item',
				label: 'Add File',
				icon: <NoteAddIcon sx={{ mr: 1 }} />,
				onClick: () => {
					handleCloseMenu();
					void createFile();
				},
			},
			{ type: 'divider' },
			{
				type: 'item',
				label: 'Search in Folder',
				icon: <ManageSearchIcon sx={{ mr: 1 }} />,
				onClick: () => {
					handleCloseMenu();
					setSearchMode('folder');
				},
			},
			{
				type: 'item',
				label: 'Search All Files',
				icon: <SearchIcon sx={{ mr: 1 }} />,
				onClick: () => {
					handleCloseMenu();
					setSearchMode('global');
				},
			},
		];

		if (selectedItem?.type === 'folder' || selectedItem?.type === 'file') {
			items.push(
				{ type: 'divider' },
				{
					type: 'item',
					label: selectedItem.type === 'folder' ? 'Delete Folder' : 'Delete File',
					icon: <DeleteIcon sx={{ mr: 1 }} />,
					onClick: () => {
						handleCloseMenu();
						void deleteSelectedItem();
					},
				},
			);
		}

		return items;
	}, [ createFile, createFolder, deleteSelectedItem, selectedItem, setSearchMode ]);

	useBackHandler(() => {
		if (searchMode) {
			exitSearchMode();

			return;
		}

	});

	const searchPlaceholder = searchMode === 'folder'
		? 'Search files in this folder...'
		: 'Search all files...';

	return (
		<AppBar>
			{searchMode
				? (
					<>
						<AppbarIconButton
							edge="start"
							icon={<ArrowBackIcon />}
							label="exit search"
							onClick={exitSearchMode}
						/>
						<InputBase
							autoFocus
							inputProps={{ 'aria-label': searchPlaceholder }}
							placeholder={searchPlaceholder}
							sx={{
								backgroundColor: 'background.paper',
								color: 'text.primary',
								borderRadius: 1,
								flexGrow: 1,
								ml: 1,
								py: '4px',
								px: '8px',
							}}
							value={searchQuery}
							onChange={event => setSearchQuery(event.target.value)}
						/>
					</>
				)
				: (
					<>
						<OpenMenuButton />
						<ToolbarTitle title="F24 File System Task" />
					</>
				)}

			{!searchMode && (
				<>
					<Box sx={{ flexGrow: 1 }} />
					<AppbarMoreIconButton
						anchorEl={anchorEl}
						delay={150}
						handleCloseMenu={handleCloseMenu}
						handleOpenMenu={handleOpenMenu}
						menuItems={menuItems}
					/>
				</>
			)}
		</AppBar>
	);
}

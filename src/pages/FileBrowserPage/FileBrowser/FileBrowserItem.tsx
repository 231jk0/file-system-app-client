import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';

import { FileBrowserItemType } from '@/src/state-type/screens/fileBrowserPageScreen';

interface FileBrowserItemProps {
	name: string;
	type: FileBrowserItemType;
	selected: boolean;
	onClick: () => void;
	onDoubleClick?: () => void;
	onContextMenu?: (event: React.MouseEvent) => void;
}

const FileBrowserItem = ({
	name,
	type,
	selected,
	onClick,
	onDoubleClick,
	onContextMenu,
}: FileBrowserItemProps) => {
	const Icon = type === 'file' ? InsertDriveFileIcon : FolderIcon;

	return (
		<Box
			sx={{
				alignItems: 'center',
				bgcolor: selected ? 'primary.main' : 'transparent',
				color: selected ? 'primary.contrastText' : 'text.primary',
				cursor: 'default',
				display: 'flex',
				gap: '8px',
				px: '8px',
				py: '4px',
				userSelect: 'none',
				'&:hover': { bgcolor: selected ? 'primary.main' : 'action.hover' },
			}}
			onClick={onClick}
			onContextMenu={onContextMenu}
			onDoubleClick={onDoubleClick}
		>
			<Icon
				fontSize="small"
				sx={{ color: selected ? 'primary.contrastText' : type === 'file' ? 'text.secondary' : 'warning.main' }}
			/>
			<Typography
				noWrap
				variant="body2"
			>
				{name}
			</Typography>
		</Box>
	);
};

export default memo(FileBrowserItem);

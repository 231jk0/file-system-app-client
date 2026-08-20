import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';

import { FileSearchResult } from '@/src/api/files/search/get';

interface GlobalSearchResultItemProps {
	file: FileSearchResult;
	query: string;
	selected: boolean;
	onClick: () => void;
}

const GlobalSearchResultItem = ({
	file,
	query,
	selected,
	onClick,
}: GlobalSearchResultItemProps) => {
	const matchLength = file.name.startsWith(query) ? query.length : 0;
	const matchedPrefix = file.name.slice(0, matchLength);
	const nameRemainder = file.name.slice(matchLength);
	const displayPath = file.folderPath ? `/${file.folderPath}/` : '/';

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
		>
			<InsertDriveFileIcon
				fontSize="small"
				sx={{ color: selected ? 'primary.contrastText' : 'text.secondary' }}
			/>
			<Typography
				noWrap
				sx={{ minWidth: 0 }}
				variant="body2"
			>
				<Box
					component="span"
					sx={{ color: selected ? 'primary.contrastText' : 'text.secondary' }}
				>
					{displayPath}
				</Box>
				{matchLength > 0 && (
					<Box
						component="span"
						sx={{
							color: selected ? 'primary.contrastText' : 'primary.main',
							fontWeight: 700,
						}}
					>
						{matchedPrefix}
					</Box>
				)}
				<Box component="span">{nameRemainder}</Box>
			</Typography>
		</Box>
	);
};

export default memo(GlobalSearchResultItem);

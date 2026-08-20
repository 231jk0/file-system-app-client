import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { memo, useMemo } from 'react';

import FileBrowserItem from './FileBrowserItem';
import GlobalSearchResultItem from './GlobalSearchResultItem';

import { formatSearchResultCount, useSearchFilesByPrefix } from '@/src/api/files/search/get';
import { useStore } from '@/src/state/state';
import { FileBrowserSearchMode } from '@/src/state-type/screens/fileBrowserPageScreen';

interface SearchResultsProps {
	searchMode: FileBrowserSearchMode;
	searchQuery: string;
	folderId: string | null;
	folderReady: boolean;
}

const SearchResults = ({ searchMode, searchQuery, folderId, folderReady }: SearchResultsProps) => {
	const selectedItem = useStore(state => state.screens.fileBrowserPageScreen.selectedItem);
	const setSelectedItem = useStore(state => state.actions.fileBrowserPageScreen.setSelectedItem);

	const trimmedQuery = searchQuery.trim();
	const isGlobalSearch = searchMode === 'global';
	const scope = useMemo(() => (
		isGlobalSearch
			? { mode: 'global' as const }
			: {
				mode: 'folder' as const,
				folderId,
			}
	), [ folderId, isGlobalSearch ]);

	const { data, isLoading, isError, error } = useSearchFilesByPrefix(
		trimmedQuery,
		scope,
		trimmedQuery.length > 0 && (isGlobalSearch || folderReady),
	);

	const files = data?.files ?? [];
	const totalCount = data?.totalCount ?? 0;
	const resultCountLabel = formatSearchResultCount(totalCount);

	const handleSelect = (id: string) => {
		setSelectedItem({
			id,
			type: 'file',
		});
	};

	return (
		<Paper
			elevation={0}
			sx={{
				border: 1,
				borderColor: 'divider',
				minHeight: 320,
				overflow: 'auto',
				py: 0.5,
			}}
			variant="outlined"
		>
			{trimmedQuery.length === 0 && (
				<Typography
					color="text.secondary"
					sx={{
						px: '8px',
						py: '16px',
					}}
					variant="body2"
				>
					{isGlobalSearch
						? 'Type to search all files by name prefix.'
						: 'Type to search files in this folder by name prefix.'}
				</Typography>
			)}

			{trimmedQuery.length > 0 && isLoading && (
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

			{trimmedQuery.length > 0 && isError && (
				<Typography
					color="error"
					sx={{
						px: '8px',
						py: '16px',
					}}
					variant="body2"
				>
					{error instanceof Error ? error.message : 'Failed to search files'}
				</Typography>
			)}

			{trimmedQuery.length > 0 && !isLoading && !isError && (
				<>
					<Typography
						color={totalCount === 0 ? 'text.secondary' : 'text.primary'}
						sx={{
							px: '8px',
							py: '16px',
						}}
						variant="body2"
					>
						{resultCountLabel}
					</Typography>

					{isGlobalSearch
						? files.map(file => (
							<GlobalSearchResultItem
								key={file.id}
								file={file}
								query={trimmedQuery}
								selected={selectedItem?.id === file.id && selectedItem.type === 'file'}
								onClick={() => handleSelect(file.id)}
							/>
						))
						: files.map(file => (
							<FileBrowserItem
								key={file.id}
								name={file.name}
								selected={selectedItem?.id === file.id && selectedItem.type === 'file'}
								type="file"
								onClick={() => handleSelect(file.id)}
							/>
						))}
				</>
			)}
		</Paper>
	);
};

export default memo(SearchResults);

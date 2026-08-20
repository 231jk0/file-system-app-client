import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { api } from '@/src/utilities/api/api';

export interface FileSearchResult {
	id: string;
	name: string;
	folderId: string | null;
	folderPath: string | null;
}

export interface SearchFilesByPrefixResponse {
	files: FileSearchResult[];
	totalCount: number;
}

export type FileSearchScope =
	| { mode: 'global' }
	| { mode: 'folder'; folderId: string | null };

const SEARCH_RESULT_LIMIT = 10;
const SEARCH_DEBOUNCE_MS = 300;

export const formatSearchResultCount = (totalCount: number, limit = SEARCH_RESULT_LIMIT): string => {
	if (totalCount === 0) {
		return 'No matching files found.';
	}

	const fileLabel = totalCount === 1 ? 'file' : 'files';

	if (totalCount <= limit) {
		return `${totalCount} ${fileLabel} found`;
	}

	return `${totalCount} ${fileLabel} found (showing first ${limit})`;
};

const searchPath = (query: string, scope: FileSearchScope) => {
	const encodedQuery = `q=${encodeURIComponent(query)}`;

	if (scope.mode === 'global') {
		return `/files/search/prefix?${encodedQuery}`;
	}

	if (scope.folderId === null) {
		return `/files/search/prefix?${encodedQuery}&root=true`;
	}

	return `/folders/${scope.folderId}/files/search/prefix?${encodedQuery}`;
};

export const searchFilesByPrefixFn = (
	query: string,
	scope: FileSearchScope,
	signal?: AbortSignal,
) => {
	return api.get<SearchFilesByPrefixResponse>(searchPath(query, scope), undefined, signal);
};

const useDebouncedValue = (value: string, delay: number) => {
	const [ debouncedValue, setDebouncedValue ] = useState(value);

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [ delay, value ]);

	return debouncedValue;
};

export const useSearchFilesByPrefix = (query: string, scope: FileSearchScope, enabled: boolean) => {
	const trimmedQuery = query.trim();
	const debouncedQuery = useDebouncedValue(trimmedQuery, SEARCH_DEBOUNCE_MS);
	const isDebouncing = trimmedQuery !== debouncedQuery;

	const searchQuery = useQuery({
		queryKey: [ 'fileSearch', debouncedQuery, scope ],
		queryFn: ({ signal }) => searchFilesByPrefixFn(debouncedQuery, scope, signal),
		enabled: enabled && debouncedQuery.length > 0 && !isDebouncing,
		retry: false,
	});

	return {
		...searchQuery,
		isLoading: searchQuery.isLoading || (enabled && trimmedQuery.length > 0 && isDebouncing),
	};
};

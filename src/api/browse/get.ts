import { useQuery } from '@tanstack/react-query';

import { api } from '@/src/utilities/api/api';

export interface Folder {
	id: string;
	name: string;
	parentId: string | null;
	path: string;
}

export interface File {
	id: string;
	name: string;
	folderId: string | null;
}

export interface FolderContents {
	path: string;
	folder: Folder | null;
	subfolders: Folder[];
	files: File[];
}

export const getFolderContentsFn = async (path: string) => {
	return await api.get<FolderContents>(`/browse?path=${encodeURIComponent(path)}`);
};

export const useGetFolderContents = (path: string) => {
	return useQuery({
		queryKey: [ 'folderContents', path ],
		queryFn: () => getFolderContentsFn(path),
		retry: false,
		staleTime: 60 * 1000,
		refetchOnWindowFocus: true,
	});
};
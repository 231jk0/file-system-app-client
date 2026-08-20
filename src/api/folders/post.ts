import { Folder } from '@/src/api/browse/get';
import { api } from '@/src/utilities/api/api';
import { invalidateFileSystemQueries } from '@/src/utilities/queryClient';

export const createFolder = async ({ name, parentId }: { name: string; parentId?: string | null }) => {
	const result = await api.post<{ folder: Folder }>('/folders', {
		name,
		parentId,
	});

	invalidateFileSystemQueries();

	return result.folder;
};

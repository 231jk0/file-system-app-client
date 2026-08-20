import { File } from '@/src/api/browse/get';
import { api } from '@/src/utilities/api/api';
import { invalidateFileSystemQueries } from '@/src/utilities/queryClient';

export const createFile = async ({ name, folderId }: { name: string; folderId?: string | null }) => {
	const result = await api.post<{ file: File }>('/files', {
		name,
		folderId,
	});

	invalidateFileSystemQueries();

	return result.file;
};

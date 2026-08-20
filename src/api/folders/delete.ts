import { api } from '@/src/utilities/api/api';
import { invalidateFileSystemQueries } from '@/src/utilities/queryClient';

export const deleteFolder = async (folderId: string) => {
	await api.delete<{ message: string }>(`/folders/${folderId}`);

	invalidateFileSystemQueries();
};

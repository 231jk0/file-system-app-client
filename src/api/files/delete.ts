import { api } from '@/src/utilities/api/api';
import { invalidateFileSystemQueries } from '@/src/utilities/queryClient';

export const deleteFile = async (fileId: string) => {
	await api.delete<{ message: string }>(`/files/${fileId}`);

	invalidateFileSystemQueries();
};

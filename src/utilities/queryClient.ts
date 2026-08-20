import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const invalidateFileSystemQueries = () => {
	void queryClient.invalidateQueries({ queryKey: [ 'folderContents' ] });
	void queryClient.invalidateQueries({ queryKey: [ 'fileSearch' ] });
};

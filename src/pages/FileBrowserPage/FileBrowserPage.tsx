import { memo } from 'react';

import AppBar from './AppBar';
import FileBrowser from './FileBrowser/FileBrowser';

import AppContainer from '@/src/components/AppContainer/AppContainer';
import { useFolderUrlSync } from '@/src/utilities/navigation/useFolderNavigation';

const FileBrowserPage = () => {
	useFolderUrlSync();

	return (
		<>
			<AppBar />
			<AppContainer sx={{ pt: '16px' }}>
				<FileBrowser />
			</AppContainer>
		</>
	);
};

export default memo(FileBrowserPage);

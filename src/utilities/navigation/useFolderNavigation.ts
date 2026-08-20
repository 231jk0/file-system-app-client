import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStore } from '@/src/state/state';
import {
	folderPathToUrl,
	pathnameToFolderPath,
	toBrowsePath,
} from '@/src/utilities/folderPathNavigation';

export const useFolderUrlSync = () => {
	const location = useLocation();
	const currentPath = useStore(state => state.screens.fileBrowserPageScreen.currentPath);
	const navigateTo = useStore(state => state.actions.fileBrowserPageScreen.navigateTo);

	useEffect(() => {
		const pathFromUrl = pathnameToFolderPath(location.pathname);

		if (pathFromUrl !== currentPath) {
			navigateTo(pathFromUrl);
		}
	}, [ currentPath, location.pathname, navigateTo ]);
};

export const useFolderNavigation = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPath = useStore(state => state.screens.fileBrowserPageScreen.currentPath);

	const navigateToFolder = useCallback((path: string) => {
		const url = folderPathToUrl(toBrowsePath(path));

		if (location.pathname !== url) {
			navigate(url);
		}
	}, [ location.pathname, navigate ]);

	return {
		currentPath,
		navigateToFolder,
	};
};

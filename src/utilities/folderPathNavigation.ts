export const FILE_BROWSER_BASE_PATH = '/file-browser';

export const toBrowsePath = (folderPath: string): string => {
	if (!folderPath || folderPath === '/') {
		return '/';
	}

	return folderPath.startsWith('/') ? folderPath : `/${folderPath}`;
};

export const getParentPath = (path: string): string | null => {
	if (path === '/') {
		return null;
	}

	const segments = path.replace(/^\//, '').split('/');

	segments.pop();

	return segments.length === 0 ? '/' : `/${segments.join('/')}`;
};

const stripFileBrowserBasePath = (pathname: string): string => {
	if (pathname === FILE_BROWSER_BASE_PATH || pathname === `${FILE_BROWSER_BASE_PATH}/`) {
		return '/';
	}

	if (pathname.startsWith(`${FILE_BROWSER_BASE_PATH}/`)) {
		return pathname.slice(FILE_BROWSER_BASE_PATH.length);
	}

	return pathname;
};

export const pathnameToFolderPath = (pathname: string): string => {
	const folderPathname = stripFileBrowserBasePath(pathname);

	if (!folderPathname || folderPathname === '/') {
		return '/';
	}

	const decoded = folderPathname
		.replace(/^\//, '')
		.split('/')
		.map(segment => decodeURIComponent(segment))
		.join('/');

	return `/${decoded}`;
};

export const folderPathToUrl = (path: string): string => {
	if (path === '/') {
		return FILE_BROWSER_BASE_PATH;
	}

	const encoded = path
		.replace(/^\//, '')
		.split('/')
		.map(segment => encodeURIComponent(segment))
		.join('/');

	return `${FILE_BROWSER_BASE_PATH}/${encoded}`;
};

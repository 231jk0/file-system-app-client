import { Navigate, Route, Routes } from 'react-router-dom';

import FileBrowserPage from '@/src/pages/FileBrowserPage/FileBrowserPage';
import SettingsPage from '@/src/pages/SettingsPage/SettingsPage';
import SwipeableDrawer from '@/src/SwipeableDrawer/SwipeableDrawer';
import { FILE_BROWSER_BASE_PATH } from '@/src/utilities/folderPathNavigation';

function ClientRoutes() {
	return (
		<>
			<SwipeableDrawer />
			<Routes>
				<Route
					element={(
						<Navigate
							replace
							to={FILE_BROWSER_BASE_PATH}
						/>
					)}
					path="/"
				/>
				<Route
					element={<SettingsPage />}
					path="/settings"
				/>
				<Route
					element={<FileBrowserPage />}
					path={`${FILE_BROWSER_BASE_PATH}/*`}
				/>
			</Routes>
		</>
	);
}

export default ClientRoutes;

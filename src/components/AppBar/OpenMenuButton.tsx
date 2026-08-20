import MenuIcon from '@mui/icons-material/Menu';
import { memo } from 'react';

import { AppbarIconButton } from './AppbarIconButton';

import { useStore, zustandState } from '@/src/state/state';

const OpenMenuButton = () => {
	const drawerMode = useStore(state => state.screens.ui.drawerMode);

	if (drawerMode === 'persistent') {
		return null;
	}

	return (
		<AppbarIconButton
			className="app-bar-icon-button-open-drawer"
			delay={100}
			edge="start"
			icon={<MenuIcon />}
			label="menu"
			onClick={() => {
				zustandState().actions.ui.setDrawerOpen(true);
			}}
		/>
	);
};

export default memo(OpenMenuButton);

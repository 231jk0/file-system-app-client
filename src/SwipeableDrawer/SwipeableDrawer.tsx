import { SwipeableDrawer as MuiSwipeableDrawer, useMediaQuery } from '@mui/material';
import { memo, useEffect } from 'react';

import DrawerContent from './DrawerContent/DrawerContent';

import { useStore, zustandState } from '@/src/state/state';

const SwipeableDrawer = () => {
	const drawerOpen = useStore(state => state.screens.ui.drawerOpen);
	const drawerMode = useStore(state => state.screens.ui.drawerMode);
	const shouldBePersistentDrawer = useMediaQuery('(min-width:1650px)');

	useEffect(() => {
		zustandState().actions.ui.setDrawerMode(shouldBePersistentDrawer ? 'persistent' : 'temporary');
	}, [ shouldBePersistentDrawer ]);

	return (
		<MuiSwipeableDrawer
			anchor="left"
			disableBackdropTransition={true}
			open={drawerMode === 'persistent' ? true : drawerOpen}
			sx={{ zIndex: 1300 }}
			transitionDuration={{
				enter: 225,
				exit: 195,
			}}
			variant={drawerMode}
			onClose={() => {
				zustandState().actions.ui.setDrawerOpen(false);
			}}
			onOpen={() => {
				zustandState().actions.ui.setDrawerOpen(true);
			}}
		>
			<DrawerContent />
		</MuiSwipeableDrawer>
	);
};

export default memo(SwipeableDrawer);

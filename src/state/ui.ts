import { replenishHashStates } from '../utilities/navigation/useBackHandler';

import { StoreStateSetter } from '@/src/state-type/state-type';
import { UIActions, UIState } from '@/src/state-type/ui';

export const uiState: UIState = {
	drawerMode: 'temporary',
	drawerOpen: false,
};

export const uiActions = (set: StoreStateSetter): UIActions => ({
	setDrawerMode: (mode: 'temporary' | 'persistent') => {
		if (mode === 'persistent') {
			document.body.classList.add('persistent-drawer');
		} else {
			document.body.classList.remove('persistent-drawer');
		}
		set(state => {
			state.screens.ui.drawerMode = mode;
		});
	},
	setDrawerOpen: (open: boolean) => {
		set(state => {
			if (open) {
				replenishHashStates();
			}

			state.screens.ui.drawerOpen = open;
		});
	},
});

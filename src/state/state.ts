import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { modalsActions, modalsState } from './modals/modals.ts';
import { fileBrowserPageScreenActions, fileBrowserPageScreenState } from './screens/fileBrowserPageScreen.ts';
import { settingsActions, settingsState } from './settings.ts';
import { uiActions, uiState } from './ui.ts';

import { StoreState } from '@/src/state-type/state-type';

export const useStore = create<StoreState>()(
	immer((set, get) => {
		return {
			screens: {
				fileBrowserPageScreen: fileBrowserPageScreenState,
				modals: modalsState,
				settings: settingsState,
				ui: uiState,
			},
			actions: {
				fileBrowserPageScreen: fileBrowserPageScreenActions(set, get),
				ui: uiActions(set),
				modals: modalsActions(set),
				settings: settingsActions(set),
			},
		};
	}),
);

export const zustandState = () => useStore.getState();

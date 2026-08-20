import { WritableDraft } from 'immer';

import { ModalsActions, ModalsState } from './modals/modals';
import { FileBrowserPageScreenActions, FileBrowserPageScreenState } from './screens/fileBrowserPageScreen';
import { SettingsActions, SettingsState } from './settings';
import { UIActions, UIState } from './ui';

export interface StoreState {
	screens: {
		fileBrowserPageScreen: FileBrowserPageScreenState;
		modals: ModalsState;
		settings: SettingsState;
		ui: UIState;
	};
	actions: {
		fileBrowserPageScreen: FileBrowserPageScreenActions;
		modals: ModalsActions;
		settings: SettingsActions;
		ui: UIActions;
	};
}

export type StoreStateSetter = (
	state: StoreState | Partial<StoreState> | ((state: WritableDraft<StoreState>) => void),
	replace?: boolean,
) => void;
export type StoreStateGetter = () => StoreState;

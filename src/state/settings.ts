import { getPrimaryColor } from '../utilities/localStorage/primaryColor';

import { SettingsActions, SettingsState } from '@/src/state-type/settings';
import { StoreStateSetter } from '@/src/state-type/state-type';

const storedPrimaryColor = getPrimaryColor();

export const settingsState: SettingsState = {
	primaryColor: storedPrimaryColor.primaryColor,
	darkOrLightMode: storedPrimaryColor.darkOrLightMode,
};

export const settingsActions = (set: StoreStateSetter): SettingsActions => {
	return {
		setPrimaryColor: (primaryColor: string, darkOrLightMode: 'dark' | 'light') => {
			set(state => {
				state.screens.settings.primaryColor = primaryColor;
				state.screens.settings.darkOrLightMode = darkOrLightMode;
			});
		},
	};
};

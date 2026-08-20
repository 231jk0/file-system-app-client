export interface SettingsState {
	primaryColor: string;
	darkOrLightMode: 'dark' | 'light';
}

export interface SettingsActions {
	setPrimaryColor: (primaryColor: string, darkOrLightMode: 'dark' | 'light') => void;
}

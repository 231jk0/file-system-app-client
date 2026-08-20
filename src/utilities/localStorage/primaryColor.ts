const SETTINGS_KEY = 'primary-color';

export const savePrimaryColor = (primaryColor: string, darkOrLightMode: 'dark' | 'light') => {
	localStorage.setItem(SETTINGS_KEY, JSON.stringify({
		primaryColor,
		darkOrLightMode,
	}));
};

export const getPrimaryColor = (): { primaryColor: string, darkOrLightMode: 'dark' | 'light' } => {
	const { primaryColor, darkOrLightMode } = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') as { primaryColor: string, darkOrLightMode: 'dark' | 'light' };

	return {
		primaryColor: primaryColor ?? '#ff69b4',
		darkOrLightMode: darkOrLightMode ?? 'dark',
	};
};

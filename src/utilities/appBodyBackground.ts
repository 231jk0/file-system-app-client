import { PaletteMode } from '@mui/material/styles';

import { hexToRgba } from '@/src/utilities/colors';

export const DEFAULT_PRIMARY_COLOR = '#123456';

export const getAppBodyBackgroundImage = (primaryColor: string, mode: PaletteMode = 'light') => {
	return mode === 'light'
		? `linear-gradient(135deg, ${hexToRgba(primaryColor, 0.4)}, ${hexToRgba(primaryColor, 0.8)})`
		: `linear-gradient(180deg, ${hexToRgba(primaryColor, 0.4)}, rgba(0, 0, 0, 0.8))`;
};

export const setAppBodyBackground = (primaryColor: string, mode: PaletteMode = 'light') => {
	document.body.style.setProperty('background-image', getAppBodyBackgroundImage(primaryColor, mode));
};

import Box from '@mui/material/Box';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import clsx from 'clsx';
import { useCallback } from 'react';

import { useStore } from '@/src/state/state';
import { savePrimaryColor } from '@/src/utilities/localStorage/primaryColor';

interface SelectColorButtonProps extends ButtonBaseProps {
	color: string;
	selectedColor?: string;
	darkOrLightMode: 'dark' | 'light';
}

export const SelectColorButton = ({ color, selectedColor, darkOrLightMode, ...props }: SelectColorButtonProps) => {
	const primaryColor = useStore(state => state.screens.settings.primaryColor);
	const settingsDarkOrLightMode = useStore(state => state.screens.settings.darkOrLightMode);
	const setPrimaryColor = useStore(state => state.actions.settings.setPrimaryColor);
	const selected = color === primaryColor && darkOrLightMode === settingsDarkOrLightMode;

	const handleColorChange = useCallback(() => {
		savePrimaryColor(color, darkOrLightMode);
		setPrimaryColor(color, darkOrLightMode);
	}, [ color, darkOrLightMode, setPrimaryColor ]);

	return (
		<ButtonBase
			className={clsx({
				'select-color-button': true,
				'select-color-button--selected': selected,
			})}
			sx={{
				boxShadow: selected ? `0 0 0 3px ${selectedColor}` : undefined,
				overflow: 'hidden',
				transition: 'box-shadow 0.15s ease',
			}}
			onClick={handleColorChange}
			{...props}
		>
			<Box
				sx={{
					backgroundColor: color,
					height: '28px',
					width: '28px',
				}}
			/>
		</ButtonBase>
	);
};

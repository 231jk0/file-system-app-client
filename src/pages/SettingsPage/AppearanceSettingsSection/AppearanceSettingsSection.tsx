import { Box, Typography } from '@mui/material';

import SettingsCard from '../SettingsCard';

import { SelectColorButton } from './SelectColorButton/SelectColorButton';

export const lightModeContrastMap = {
	'#191970': '#4169E1',
	'#660000': '#DC143C',
	'#006400': '#32CD32',
	'#4B0082': '#9400D3',
	'#6B4F1B': '#DAA520',
	'#CC5500': '#CD853F',
	'#004E5A': '#008B8B',
	'#512DA8': '#9400D3',
};

const darkModeColors = [
	'#FF4D4D',
	'#FF99FF',
	'#FFFF66',
	'#FFD700',
	'#00BFFF',
	'#FF8C00',
	'#F0E68C',
	'#FF1493',
];

const ColorSwatchGroup = ({
	colors,
	darkOrLightMode,
	selectedColor,
	swatchBackground,
}: {
	colors: string[];
	darkOrLightMode: 'dark' | 'light';
	selectedColor: string;
	swatchBackground: string;
}) => (
	<Box
		sx={{
			background: swatchBackground,
			borderRadius: '16px !important',
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			maxWidth: '300px',
			gap: '8px !important',
			p: '12px !important',
		}}
	>
		{colors.map(color => (
			<SelectColorButton
				key={color}
				color={color}
				darkOrLightMode={darkOrLightMode}
				selectedColor={selectedColor}
			/>
		))}
	</Box>
);

export const AppearanceSettingsSection = () => {
	return (
		<SettingsCard>
			<Box
				sx={{
					px: '16px !important',
					py: '16px !important',
				}}
			>
				<Typography
					sx={{
						fontWeight: 600,
						mb: '8px !important',
					}}
					variant="subtitle1"
				>
					Theme Color
				</Typography>
				<Typography
					color="text.secondary"
					sx={{ mb: '16px !important' }}
					variant="body2"
				>
					Choose an accent color for light or dark mode.
				</Typography>

				<Typography
					color="text.secondary"
					sx={{
						fontWeight: 500,
						mb: '8px !important',
					}}
					variant="caption"
				>
					Light mode
				</Typography>
				<ColorSwatchGroup
					colors={Object.keys(lightModeContrastMap)}
					darkOrLightMode="light"
					selectedColor="black"
					swatchBackground="#EEEEEE"
				/>

				<Box sx={{ mt: '8px !important' }} />
				<Typography
					color="text.secondary"
					sx={{
						fontWeight: 500,
						mb: '8px !important',
					}}
					variant="caption"
				>
					Dark mode
				</Typography>
				<ColorSwatchGroup
					colors={darkModeColors}
					darkOrLightMode="dark"
					selectedColor="white"
					swatchBackground="#111111"
				/>
			</Box>

		</SettingsCard>
	);
};

export default AppearanceSettingsSection;

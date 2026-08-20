import { SxProps } from '@mui/material';
import { Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { memo } from 'react';

interface ToolbarTitleProps {
	title: string;
	sx?: SxProps<Theme>;
}

export const ToolbarTitle = ({ title, sx = {} }: ToolbarTitleProps) => {
	const darkOrLight = useTheme().palette.mode;

	return (
		<Typography
			color={darkOrLight === 'light' ? 'inherit' : 'primary'}
			sx={{ ...sx }}
			variant="h6"
		>
			{title}
		</Typography>
	);
};

export default memo(ToolbarTitle);

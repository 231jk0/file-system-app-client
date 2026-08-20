import { Box, Typography } from '@mui/material';
import { memo, ReactNode } from 'react';

type SettingsSectionProps = {
	title: string;
	children: ReactNode;
};

const SettingsSection = ({ title, children }: SettingsSectionProps) => (
	<Box sx={{ mb: '24px !important' }}>
		<Typography
			color="text.secondary"
			sx={{
				display: 'block',
				fontWeight: 600,
				letterSpacing: '0.08em',
				mb: '8px !important',
				px: '8px !important',
				textTransform: 'uppercase',
			}}
			variant="caption"
		>
			{title}
		</Typography>
		{children}
	</Box>
);

export default memo(SettingsSection);

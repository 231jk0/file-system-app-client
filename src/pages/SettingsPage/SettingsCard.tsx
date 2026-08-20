import { Card, CardContent } from '@mui/material';
import { memo, ReactNode } from 'react';

type SettingsCardProps = {
	children: ReactNode;
};

const SettingsCard = ({ children }: SettingsCardProps) => (
	<Card
		sx={{
			borderRadius: '16px !important',
			boxShadow: theme => theme.palette.mode === 'dark'
				? '0 1px 3px rgba(0, 0, 0, 0.4)'
				: '0 1px 3px rgba(0, 0, 0, 0.08)',
			overflow: 'hidden',
		}}
		variant="outlined"
	>
		<CardContent
			sx={{
				'&:last-child': { pb: 0 },
				p: 0,
			}}
		>
			{children}
		</CardContent>
	</Card>
);

export default memo(SettingsCard);

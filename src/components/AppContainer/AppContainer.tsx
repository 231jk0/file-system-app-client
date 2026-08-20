import { Container as MuiContainer, ContainerProps } from '@mui/material';
import { memo } from 'react';

const AppContainer = ({ children, sx, ...props }: ContainerProps) => {
	return (
		<MuiContainer
			maxWidth="md"
			sx={[
				{
					display: 'flex',
					flexDirection: 'column',
					minHeight: [
						'calc(100vh - 64px) !important',
						'calc(var(--vh, 1vh) * 100 - 64px) !important',
					],
					'@media (max-width: 768px)': {
						minHeight: [
							'calc(100vh - 56px) !important',
							'calc(var(--vh, 1vh) * 100 - 56px) !important',
						],
					},
					'.touch &': {
						minHeight: [
							'calc(100vh - 56px) !important',
							'calc(var(--vh, 1vh) * 100 - 56px) !important',
						],
					},
					'.dark &': { backgroundColor: '#272727' },
					'.light &': { backgroundColor: '#fff' },
				},
				...(Array.isArray(sx) ? sx : [ sx ]),
			]}
			{...props}
		>
			{children}
		</MuiContainer>
	);
};

export default memo(AppContainer);
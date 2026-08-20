import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { memo } from 'react';

import { hexToRgba } from '@/src/utilities/colors';

const DrawerHeader = () => {
	const primary = useTheme().palette.primary;

	return (
		<Box
			sx={{
				background: `linear-gradient(135deg, ${primary.main} 0%, ${hexToRgba(primary.main, 0.7)} 100%)`,
				height: 180,
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				'& img': {
					width: '99%',
					height: '99%',
					objectFit: 'contain',
					filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25))',
				},
			}}
		>
			<img
				alt="Drawer header"
				src="/f24-logo.png"
			/>
			<Box
				sx={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)',
					color: 'white',
					px: 2,
					py: 1.5,
				}}
			>
				<Typography
					sx={{
						color: 'white',
						fontWeight: 700,
						fontSize: '1.25rem',
						letterSpacing: '0.02em',
						textShadow: '0px 2px 4px rgba(0,0,0,0.3)',
					}}
				>
					F24 File System Task
				</Typography>
			</Box>
		</Box>
	);
};

export default memo(DrawerHeader);

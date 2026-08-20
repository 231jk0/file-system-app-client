import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Divider, Link, Typography } from '@mui/material';
import { memo } from 'react';

import DrawerHeader from './DrawerHeader';
import NavigationItems from './NavigationItems/NavigationItems';

import { zustandState } from '@/src/state/state';

const GITHUB_URL = 'https://github.com/231jk0/file-system-app';

const ApplicationSwipeableDrawer = () => {
	return (
		<Box
			role="presentation"
			sx={{
				width: 290,
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
			onKeyDown={() => zustandState().actions.ui.setDrawerOpen(false)}
		>
			<DrawerHeader />
			<NavigationItems />
			<Box sx={{ mt: 'auto' }}>
				<Divider />
				<Link
					href={GITHUB_URL}
					rel="noopener noreferrer"
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1.5,
						px: 2,
						pl: 7,
						py: 1.5,
						color: 'text.secondary',
						textDecoration: 'none',
						'&:hover': {
							color: 'text.primary',
							backgroundColor: 'action.hover',
						},
					}}
					target="_blank"
				>
					<GitHubIcon fontSize="small" />
					<Typography
						noWrap
						sx={{ fontSize: '0.85rem !important' }}
					>
						View Source Code
					</Typography>
				</Link>
			</Box>
		</Box>
	);
};

export default memo(ApplicationSwipeableDrawer);

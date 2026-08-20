import { Toolbar } from '@mui/material';
import { AppBar as MuiAppBar } from '@mui/material';
import { memo } from 'react';

interface AppBarProps {
	children: React.ReactNode;
}

const AppBar = ({ children }: AppBarProps) => {
	return (
		<MuiAppBar
			className="app-bar"
			position="fixed"
			sx={{
				top: 0,
				left: 0,
			}}
		>
			<Toolbar>
				{children}
			</Toolbar>
		</MuiAppBar>
	);
};

export default memo(AppBar);

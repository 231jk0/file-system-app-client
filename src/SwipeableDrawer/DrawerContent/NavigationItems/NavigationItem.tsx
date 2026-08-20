import { ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { memo, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { zustandState } from '@/src/state/state';
import { hexToRgba } from '@/src/utilities/colors';

export type NavigationItemProps = {
	text: string;
	icon: React.ReactNode;
	path: string;
};

const isModifiedClick = (event: MouseEvent) =>
	event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const NavigationItem = ({ text, icon, path }: NavigationItemProps) => {
	const { palette } = useTheme();
	const navigate = useNavigate();

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		zustandState().actions.ui.setDrawerOpen(false);

		if (isModifiedClick(event)) {
			return;
		}

		event.preventDefault();
		navigate(path);
	};

	return (
		<ListItem
			component="a"
			href={path}
			sx={{
				color: 'inherit',
				cursor: 'pointer',
				textDecoration: 'none',
				WebkitTapHighlightColor: 'transparent',
				'&:hover': { backgroundColor: hexToRgba(palette.primary.main, 0.2) },
			}}
			onClick={handleClick}
		>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={text} />
		</ListItem>
	);
};

export default memo(NavigationItem);

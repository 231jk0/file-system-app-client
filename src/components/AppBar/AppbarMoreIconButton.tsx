import MoreIcon from '@mui/icons-material/MoreVert';
import { Divider, Menu, MenuItem as MuiMenuItem, Typography, useTheme } from '@mui/material';

import { AppbarIconButton } from './AppbarIconButton';

import { hexToRgba } from '@/src/utilities/colors';
import { delayedAction } from '@/src/utilities/delayedAction';
import { IS_TOUCH_DEVICE } from '@/src/utilities/useIsTouchDevice';

export interface MenuActionItem {
	type: 'item';
	label: string;
	onClick: () => void;
	icon?: React.ReactNode;
}

export interface MenuDividerItem {
	type: 'divider';
}

export type MenuItem =
	| MenuActionItem
	| MenuDividerItem;

interface AppbarMoreIconButtonProps {
	anchorEl: HTMLElement | null;
	menuItems: MenuItem[];
	handleOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
	handleCloseMenu: () => void;
	delay?: number;
}

export const AppbarMoreIconButton = ({
	handleOpenMenu,
	handleCloseMenu,
	anchorEl,
	menuItems,
	delay = 150,
}: AppbarMoreIconButtonProps) => {
	const theme = useTheme();

	return (
		<>
			<AppbarIconButton
				delay={100}
				edge="end"
				icon={<MoreIcon />}
				label="display more actions"
				onClick={handleOpenMenu}
			/>

			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				id="menu-appbar"
				open={Boolean(anchorEl)}
				slotProps={{ paper: { style: { borderRadius: 0 } } }}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				onClose={handleCloseMenu}
			>
				{menuItems.map((item, index) => {
					if (item.type === 'divider') {
						return (
							<Divider
								key={`divider-${index}`}
								sx={{ my: 1 }}
							/>
						);
					}

					return (
						<MuiMenuItem
							key={`${item.label}-${index}`}
							className="custom-menu-item"
							sx={{
								'&:hover': {
									backgroundColor: IS_TOUCH_DEVICE
										? 'transparent'
										: hexToRgba(theme.palette.primary.main, 0.1),
								},
							}}
							onClick={() => delayedAction(item.onClick, delay)}
						>
							{item.icon}
							<Typography
								sx={{
									ml: 0.5,
									fontSize: '16px !important',
								}}
							>
								{item.label}
							</Typography>
						</MuiMenuItem>
					);
				})}
			</Menu>
		</>
	);
};

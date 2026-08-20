import { SxProps, Theme, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import clsx from 'clsx';

import { delayedAction } from '@/src/utilities/delayedAction';

const iconButtonStyles: SxProps<Theme> = { '&:active': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } };

interface AppbarIconButtonProps extends IconButtonProps {
	icon: React.ReactNode;
	label: string;
	delay?: number;
}

export const AppbarIconButton = ({
	onClick,
	icon,
	label,
	edge,
	delay = 200,
	sx,
	className,
	...props
}: AppbarIconButtonProps) => {
	const { mode } = useTheme().palette;
	const isLightMode = mode === 'light';

	const handleClick: NonNullable<IconButtonProps['onClick']> = event => {
		const currentTarget = event.currentTarget;
		const action = () => onClick?.({
			...event,
			currentTarget,
		});

		if (delay === 0) {
			action();
		} else {
			delayedAction(action, delay);
		}
	};

	return (
		<IconButton
			{...props}
			disableRipple
			aria-label={label}
			className={clsx('toolbar-icon-button', className)}
			color={isLightMode ? 'inherit' : 'primary'}
			edge={edge}
			loadingIndicator={
				<CircularProgress
					color="inherit"
					size={16}
					sx={{ color: isLightMode ? 'white' : 'primary.main' }}
				/>
			}
			size="large"
			sx={{
				...iconButtonStyles,
				...sx,
			}}
			onClick={handleClick}
		>
			{icon}
		</IconButton>
	);
};

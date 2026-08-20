import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { forwardRef, memo } from 'react';

import { delayedAction } from '@/src/utilities/delayedAction';
import { IS_TOUCH_DEVICE } from '@/src/utilities/useIsTouchDevice';

export interface ButtonProps extends MuiButtonProps {
	delay?: number;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
	{
		delay = IS_TOUCH_DEVICE ? 300 : 100,
		onClick,
		sx,
		className,
		children,
		...props
	},
	ref,
) => {
	const isContained = props.variant === 'contained';
	const isPrimaryContained = isContained &&
		(!props.color || props.color === 'primary' || props.color === 'inherit');

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (!onClick) {
			return;
		}

		if (delay === 0) {
			onClick(event);
		} else {
			delayedAction(() => onClick(event), delay);
		}
	};

	return (
		<MuiButton
			ref={ref}
			{...props}
			disableElevation
			className={`${isPrimaryContained ? 'primary-contained-button' : ''} ${className || ''}`.trim()}
			sx={{
				'.MuiTouchRipple-child': { backgroundColor: isContained ? 'white !important' : '' },
				'.MuiTouchRipple-rippleVisible': {
					backgroundColor: isContained ? 'inherit' : 'transparent',
					opacity: '0.4 !important',
				},
				...sx,
			}}
			onClick={handleClick}
		>
			{children}
		</MuiButton>
	);
});

Button.displayName = 'Button';

export default memo(Button);

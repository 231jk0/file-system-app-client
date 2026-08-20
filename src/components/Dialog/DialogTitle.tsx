import {
	DialogTitle as MuiDialogTitle,
	DialogTitleProps as MuiDialogTitleProps,
} from '@mui/material';
import React from 'react';

interface DialogTitleProps extends MuiDialogTitleProps {
}

const DialogTitle: React.FC<DialogTitleProps> = ({ children, ...props }) => {
	return (
		<MuiDialogTitle
			{...props}
			sx={{
				fontWeight: 'bold',
				color: 'primary.main',
				pb: 0,
				...props.sx,
			}}
		>
			{children}
		</MuiDialogTitle>
	);
};

export default DialogTitle;

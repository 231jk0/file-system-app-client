import {
	DialogContent as MuiDialogContent,
	DialogContentProps as MuiDialogContentProps,
} from '@mui/material';
import React from 'react';

interface DialogContentProps extends MuiDialogContentProps {
}

const DialogContent: React.FC<DialogContentProps> = ({ children, ...props }) => {
	return (
		<MuiDialogContent
			{...props}
			sx={{
				pt: '2px !important',
				pb: 0,
				...props.sx,
			}}
		>
			{children}
		</MuiDialogContent>
	);
};

export default DialogContent;

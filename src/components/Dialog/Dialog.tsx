import {
	Dialog as MuiDialog,
	DialogProps as MuiDialogProps,
} from '@mui/material';
import React from 'react';

interface DialogProps extends MuiDialogProps {
	children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ children, ...props }) => {
	return (
		<MuiDialog
			{...props}
			sx={{
				'& .MuiDialog-paper': {
					width: 'calc(100vw - 10px)',
					maxWidth: '650px',
					margin: 0,
					maxHeight: '100%',
				},
				...props.sx,
			}}
		>
			{children}
		</MuiDialog>
	);
};

export default Dialog;

import {
	DialogActions as MuiDialogActions,
	DialogActionsProps as MuiDialogActionsProps,
} from '@mui/material';
import React from 'react';

interface DialogActionsProps extends MuiDialogActionsProps {
}

const DialogActions: React.FC<DialogActionsProps> = ({ children, ...props }) => {
	return (
		<MuiDialogActions
			sx={{
				'@media (min-width: 600px)': {
					padding: '16px !important',
					paddingTop: '8px !important',
				},
			}}
			{...props}
		>
			{children}
		</MuiDialogActions>
	);
};

export default DialogActions;

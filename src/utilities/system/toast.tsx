import { Alert } from '@mui/material';
import { toast as reactToastifyToast } from 'react-toastify';

import { IS_TOUCH_DEVICE } from '../useIsTouchDevice';

export const toast = ({
	message,
	severity = 'info',
}: {
	message: string;
	severity?: 'success' | 'error' | 'warning' | 'info';
}) => {
	return reactToastifyToast(
		() => (
			<Alert
				severity={severity}
				sx={{ width: '100%' }}
			>
				{message}
			</Alert>
		),
		{
			className: 'custom-notification',
			autoClose: 10000,
			hideProgressBar: true,
			position: IS_TOUCH_DEVICE ? 'bottom-center' : 'top-center',
			closeButton: false,
		},
	);
};

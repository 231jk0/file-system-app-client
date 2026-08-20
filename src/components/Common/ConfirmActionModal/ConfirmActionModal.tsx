import DialogContentText from '@mui/material/DialogContentText';

import { useStore, zustandState } from '../../../state/state';

import Button from '@/src/components/Button/Button';
import Dialog from '@/src/components/Dialog/Dialog';
import DialogActions from '@/src/components/Dialog/DialogActions';
import DialogContent from '@/src/components/Dialog/DialogContent';
import DialogTitle from '@/src/components/Dialog/DialogTitle';

const ConfirmActionModal = () => {
	const confirmAction = useStore(state => state.screens.modals.confirmActionModal);
	const currentModal = useStore(state => state.screens.modals.currentModal);

	const dismiss = (handler?: () => void) => {
		handler?.();
		zustandState().actions.modals.showModal([]);
		zustandState().actions.modals.confirmActionModal.setConfirmAction({
			title: '',
			text: '',
			primaryButtonText: '',
			secondaryButtonText: '',
			onCancel: undefined,
			onConfirm: undefined,
		});
	};

	return (
		<Dialog
			aria-describedby="alert-dialog-description"
			aria-labelledby="alert-dialog-title"
			open={currentModal.includes('CONFIRM_ACTION')}
			onClose={() => dismiss(confirmAction.onCancel)}
		>
			<DialogTitle id="alert-dialog-title">
				{confirmAction.title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{confirmAction.text}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => dismiss(confirmAction.onCancel)}>
					{confirmAction.primaryButtonText}
				</Button>
				<Button
					color="error"
					onClick={() => dismiss(confirmAction.onConfirm)}
				>
					{confirmAction.secondaryButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmActionModal;

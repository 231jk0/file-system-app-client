import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

import Button from '@/src/components/Button/Button';
import Dialog from '@/src/components/Dialog/Dialog';
import DialogActions from '@/src/components/Dialog/DialogActions';
import DialogContent from '@/src/components/Dialog/DialogContent';
import DialogTitle from '@/src/components/Dialog/DialogTitle';
import { useStore } from '@/src/state/state';

const EditTextAreaModal = () => {
	const currentModal = useStore(state => state.screens.modals.currentModal);
	const initialValue = useStore(state => state.screens.modals.editTextAreaModal.initialValue);
	const title = useStore(state => state.screens.modals.editTextAreaModal.title);
	const onCleanup = useStore(state => state.screens.modals.editTextAreaModal.onCleanup);
	const onConfirm = useStore(state => state.screens.modals.editTextAreaModal.onConfirm);
	const [ tempValue, setTempValue ] = useState(initialValue);

	useEffect(() => {
		if (currentModal.includes('EDIT_TEXT_AREA')) {
			setTempValue(initialValue);
		}
	}, [ currentModal, initialValue ]);

	const handleClose = () => {
		onCleanup?.(initialValue);
	};

	const handleConfirm = () => {
		onConfirm?.(tempValue);
		onCleanup?.(tempValue);
	};

	return (
		<Dialog
			fullWidth
			maxWidth="sm"
			open={currentModal.includes('EDIT_TEXT_AREA')}
			onClose={handleClose}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent sx={{ marginTop: '2px' }}>
				<TextField
					autoFocus
					fullWidth
					value={tempValue}
					onChange={event => setTempValue(event.target.value)}
					onKeyDown={event => {
						if (event.key === 'Enter') {
							event.preventDefault();
							handleConfirm();
						}
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					color="primary"
					variant="outlined"
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					color="primary"
					variant="contained"
					onClick={handleConfirm}
				>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditTextAreaModal;

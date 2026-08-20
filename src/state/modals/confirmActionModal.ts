import { ConfirmActionModalActions, ConfirmActionModalState } from '@/src/state-type/modals/confirmActionModal';
import { StoreStateSetter } from '@/src/state-type/state-type';

export const confirmActionModalState: ConfirmActionModalState = {
	title: '',
	text: '',
	primaryButtonText: '',
	secondaryButtonText: '',
	onCancel: undefined,
	onConfirm: undefined,
};

export const confirmActionModalActions = (set: StoreStateSetter): ConfirmActionModalActions => {
	return {
		setConfirmAction: ({ title, text, primaryButtonText, secondaryButtonText, onCancel, onConfirm }) => {
			set(state => {
				state.screens.modals.confirmActionModal.title = title;
				state.screens.modals.confirmActionModal.text = text;
				state.screens.modals.confirmActionModal.primaryButtonText = primaryButtonText;
				state.screens.modals.confirmActionModal.secondaryButtonText = secondaryButtonText;
				state.screens.modals.confirmActionModal.onCancel = onCancel;
				state.screens.modals.confirmActionModal.onConfirm = onConfirm;
			});
		},
	};
};

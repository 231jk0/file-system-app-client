import { EditTextAreaModalActions, EditTextAreaModalState } from '@/src/state-type/modals/editTextAreaModal';
import { StoreStateSetter } from '@/src/state-type/state-type';

export const editTextAreaModalState: EditTextAreaModalState = {
	title: '',
	initialValue: '',
	onConfirm: undefined,
	onCleanup: undefined,
};

export const editTextAreaModalActions = (set: StoreStateSetter): EditTextAreaModalActions => {
	return {
		setEditTextAreaModal: ({ title, initialValue, onConfirm, onCleanup }) => {
			set(state => {
				state.screens.modals.editTextAreaModal.title = title;
				state.screens.modals.editTextAreaModal.initialValue = initialValue;
				state.screens.modals.editTextAreaModal.onConfirm = onConfirm;
				state.screens.modals.editTextAreaModal.onCleanup = onCleanup;
			});
		},
	};
};

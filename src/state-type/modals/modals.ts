import { ConfirmActionModalActions, ConfirmActionModalState } from './confirmActionModal';
import { EditTextAreaModalActions, EditTextAreaModalState } from './editTextAreaModal';

import { zustandState } from '@/src/state/state';

export type ModalType =
	| 'CONFIRM_ACTION'
	| 'EDIT_TEXT_AREA';

export const modalTypeToClose = {
	CONFIRM_ACTION: () => {
		zustandState().screens.modals.confirmActionModal.onCancel?.();
	},
};

export interface ModalsState {
	currentModal: ModalType[];
	confirmActionModal: ConfirmActionModalState;
	editTextAreaModal: EditTextAreaModalState;
}

export interface ModalsActions {
	showModal: (modalType: ModalType[]) => void;
	confirmActionModal: ConfirmActionModalActions;
	editTextAreaModal: EditTextAreaModalActions;
}

import { confirmActionModalActions, confirmActionModalState } from '@/src/state/modals/confirmActionModal';
import { editTextAreaModalActions, editTextAreaModalState } from '@/src/state/modals/editTextAreaModal';
import { ModalsActions, ModalsState, ModalType } from '@/src/state-type/modals/modals';
import { StoreStateSetter } from '@/src/state-type/state-type';
import { replenishHashStates } from '@/src/utilities/navigation/useBackHandler';

export const modalsState: ModalsState = {
	currentModal: [],
	confirmActionModal: confirmActionModalState,
	editTextAreaModal: editTextAreaModalState,
};

export const modalsActions = (set: StoreStateSetter): ModalsActions => {
	return {
		showModal: (modalTypes: ModalType[]) => {
			replenishHashStates();
			set(state => {
				state.screens.modals.currentModal = modalTypes;
			});
		},
		confirmActionModal: confirmActionModalActions(set),
		editTextAreaModal: editTextAreaModalActions(set),
	};
};

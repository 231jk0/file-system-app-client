import { memo } from 'react';

import ConfirmActionModal from '@/src/components/Common/ConfirmActionModal/ConfirmActionModal';
import EditTextAreaModal from '@/src/components/Common/EditTextAreaModal/EditTextAreaModal';
import { useStore } from '@/src/state/state';

const Modals = () => {
	const currentModal = useStore(state => state.screens.modals.currentModal);

	return (
		<>
			{currentModal.includes('CONFIRM_ACTION') && <ConfirmActionModal />}
			{currentModal.includes('EDIT_TEXT_AREA') && <EditTextAreaModal />}
		</>
	);
};

export default memo(Modals);

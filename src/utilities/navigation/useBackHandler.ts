import { useEffect } from 'react';

import { zustandState } from '@/src/state/state';
import { modalTypeToClose } from '@/src/state-type/modals/modals';

let lastPage = '';
let hashesRemaining = 0;

export const useBackHandler = (onBack?: () => void) => {
	useEffect(() => {
		replenishHashStates();
	}, []);

	useEffect(() => {
		const handlePopState = (event: PopStateEvent) => {
			event.preventDefault();

			hashesRemaining--;

			if (zustandState().screens.modals.currentModal.length > 0) {
				const currentModal = zustandState().screens.modals.currentModal;
				const lastModal = currentModal[currentModal.length - 1];
				if (modalTypeToClose[lastModal]) {
					modalTypeToClose[lastModal]?.();

					return;
				}
				zustandState().actions.modals.showModal(
					currentModal.slice(0, -1),
				);
			} else if (zustandState().screens.ui.drawerOpen) {
				zustandState().actions.ui.setDrawerOpen(false);
			} else if (onBack) {
				onBack();
			} else {
				console.info('Back handler should navigate to home');
			}
		};

		window.addEventListener('popstate', handlePopState);

		return () => window.removeEventListener('popstate', handlePopState);
	}, [ onBack ]);
};

export const replenishHashStates = (numberOfHashStates = 10) => {
	const currentPage = window.location.pathname;

	if (currentPage !== lastPage || hashesRemaining === 0) {
		setTimeout(() => {
			for (let i = 0; i < numberOfHashStates; i++) {
				window.history.pushState(null, '', window.location.pathname /* + '#' + i */);
			}
		}, 15);

		hashesRemaining = numberOfHashStates;
		lastPage = currentPage;
	}
};

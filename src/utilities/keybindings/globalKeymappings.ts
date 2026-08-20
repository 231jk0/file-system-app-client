import Mousetrap from 'mousetrap';

import { zustandState } from '@/src/state/state';

export const globalKeymappings = () => {
	Mousetrap.bind('escape', (e: KeyboardEvent) => {
		e.preventDefault();
		zustandState().actions.ui.setDrawerOpen(true);
	});
};

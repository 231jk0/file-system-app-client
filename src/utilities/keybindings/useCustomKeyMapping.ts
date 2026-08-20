import Mousetrap from 'mousetrap';
import { useEffect } from 'react';

import { globalKeymappings } from './globalKeymappings';

const emptyFunction = () => {
	return;
};

export const useCustomKeyMapping = (keymappings = emptyFunction) => {
	useEffect(() => {
		globalKeymappings();
		keymappings?.();

		return () => {
			Mousetrap.reset();

			return;
		};
	}, [ keymappings ]);
};

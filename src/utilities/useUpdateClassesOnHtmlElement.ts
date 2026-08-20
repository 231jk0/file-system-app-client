import { useEffect } from 'react';

import { IS_TOUCH_DEVICE } from './useIsTouchDevice';

export const useUpdateClassesOnHtmlElement = () => {
	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle('touch-device', IS_TOUCH_DEVICE);
		root.classList.toggle('no-touch-device', !IS_TOUCH_DEVICE);
	}, []);

	useEffect(() => {
		const updateVh = () => {
			const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
			const vh = height * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};

		updateVh();

		const target = window.visualViewport || window;
		target.addEventListener('resize', updateVh);

		return () => {
			target.removeEventListener('resize', updateVh);
		};
	}, []);
};

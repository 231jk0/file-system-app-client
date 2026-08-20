import { useEffect } from 'react';

export const useSetupScrollbar = (primaryColor: string, darkOrLightMode: string) => {
	useEffect(() => {
		const style = document.createElement('style');
		const backgroundColor = darkOrLightMode === 'light' ? 'white' : 'black';

		style.innerHTML = `
			html, body {
				scrollbar-color: ${primaryColor} ${backgroundColor}; /* thumb | track */
				scrollbar-width: thin;
			}

			::-webkit-scrollbar {
				display: block;
			}

			::-webkit-scrollbar-thumb {
				background: ${primaryColor};
				border-radius: 4px;
			}

			::-webkit-scrollbar-track {
				background: ${backgroundColor};
				border-radius: 4px;
			}
		`;

		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, [ primaryColor, darkOrLightMode ]);
};
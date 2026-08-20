import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLayoutEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

import ClientRoutes from './ClientRoutes/ClientRoutes';
import { useStore } from './state/state';
import { setAppBodyBackground } from './utilities/appBodyBackground';
import { useSetupScrollbar } from './utilities/useSetupScrollbar';
import { useUpdateClassesOnHtmlElement } from './utilities/useUpdateClassesOnHtmlElement';

import Modals from '@/src/Modals';
import { IS_TOUCH_DEVICE } from '@/src/utilities/useIsTouchDevice';

const createAppTheme = (primaryColor: string, darkOrLightMode: 'dark' | 'light') => {
	return createTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 1360,
				lg: 1360,
				xl: 1536,
			},
		},
		typography: { fontFamily: 'Roboto, sans-serif' },
		palette: {
			primary: { main: primaryColor },
			mode: darkOrLightMode,
		},
		components: { MuiTouchRipple: { styleOverrides: { ripple: { borderRadius: 300 } } } },
	});
};

function App() {
	const { primaryColor, darkOrLightMode } = useStore(state => state.screens.settings);
	useUpdateClassesOnHtmlElement();
	useSetupScrollbar(primaryColor, darkOrLightMode);

	useLayoutEffect(() => {
		document.body.classList.add(darkOrLightMode);
		document.body.classList.remove(darkOrLightMode === 'light' ? 'dark' : 'light');
		setAppBodyBackground(primaryColor, darkOrLightMode);
	}, [ darkOrLightMode, primaryColor ]);

	return (
		<BrowserRouter>
			<ThemeProvider theme={createAppTheme(primaryColor, darkOrLightMode)}>
				<Paper
					className="app-container"
					elevation={2}
				>
					<ClientRoutes />
				</Paper>
				<Modals />
				<ToastContainer
					closeButton={false}
					newestOnTop={IS_TOUCH_DEVICE}
					style={{
						'--toastify-color-progress-light': primaryColor,
						'--toastify-color-progress-dark': primaryColor,
					} as React.CSSProperties}
					transition={Slide}
				/>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;

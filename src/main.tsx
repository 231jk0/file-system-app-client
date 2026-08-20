import './init.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';
import { queryClient } from './utilities/queryClient.ts';

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>,
);

import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [ react() ],
	base: './',
	build: { target: 'es2020' },
	resolve: { alias: { '@': resolve(__dirname, './') } },
});

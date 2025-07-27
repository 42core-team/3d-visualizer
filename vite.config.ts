import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { threlteStudio } from '@threlte/studio/vite';

export default defineConfig({
	plugins: [threlteStudio(), sveltekit(), tailwindcss()],

	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: true
	}
});

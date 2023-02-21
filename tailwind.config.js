/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: { roboto: ['Roboto'], 'noto-sans-tc': ['Noto Sans TC'] },
		},
	},
	plugins: [],
	prefix: 'tw-',
};

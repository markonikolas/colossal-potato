module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		screens: {
			xs: { min: '425px' },
			sm: { min: '640px' },
			md: { min: '768px' },
			lg: { min: '1024px' },
			xl: { min: '1280px' },
			'2xl': { min: '1536px' },
		},
	},
	plugins: [],
};

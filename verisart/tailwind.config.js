/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			phone: "320px",
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }
		},
		extend: {
			colors: {
				portfolio: {
					lightgreen: "#dab600",
					midgreen: "#06D6A0",
					black: "#000000",
				},
				grey: {
					100: "#F5F7FA",
					1000: "#1F2933",
				},
			},
		},
		fontFamily: {
			sans: ["Akkurat", "sans-serif"],
		},
	},
	plugins: [],
};

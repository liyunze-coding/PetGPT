/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				primary: "#343541",
				secondary: "#eeeeee",
				gray: {
					100: "#eeeeee",
					150: "#81889b",
					200: "#40414f",
					300: "#3e3f4b",
					400: "#343541",
					500: "#2b2c2f",
					600: "#2a2b32",
					700: "#202123",
				},
			},
			width: {
				69: "260px",
			},
			height: {
				11.5: "46px",
			},
		},
	},
	plugins: [],
};

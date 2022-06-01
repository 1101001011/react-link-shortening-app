const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./src/**/*.{js,jsx}'],
	darkMode: 'media',
	theme: {
		extend: {},
		fontFamily: {
			main: ['Neue Machina', 'sans-serif'],
		},
	},
	plugins: [
		plugin(({ addComponents }) => {
			addComponents({
				'.btn-primary': {
					backgroundColor: '#000',
					color: '#fff',
					fontWeight: 'bold',
					padding: '8px 30px',
					borderRadius: '30px',

					'&:hover': {
						backgroundColor: '#2b2b2b',
					},
				},
				'.input': {
					border: '2px solid #eee',
					margin: '8px 0',
					padding: '8px 16px',
					width: '100%',
					borderRadius: '30px',

					'&:focus': {
						border: '2px solid #ccc',
						outline: 'none',
					},
				},
				'.grid-row': {
					display: 'grid',
					gridTemplateColumns: '40px 3fr 2fr 80px 80px',
					gridGap: '16px',
				},
				'.grid-item': {
					color: '#fff',
					border: '1px solid rgb(63 63 70)',
					wordBreak: 'break-all',
				},
			})
		}),
	],
}

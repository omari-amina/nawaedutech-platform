/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
				arabic: ['Almarai', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Semantic Brand Colors
				primary: {
					DEFAULT: '#340690', // Trust & Depth (The Core)
					light: '#864bf5',   // Tech & Creativity
					foreground: '#ffffff',
				},
				secondary: {
					DEFAULT: '#5f2cc7', // Innovation
					foreground: '#ffffff',
				},
				accent: {
					DEFAULT: '#f3b942', // Warmth & Motivation
					foreground: '#000000',
				},
				muted: {
					DEFAULT: '#e6e3e6', // Visual Comfort
					foreground: '#340690',
				},
				destructive: {
					DEFAULT: '#dc2626',
					foreground: '#ffffff',
				},
				card: {
					DEFAULT: '#ffffff',
					foreground: '#000000',
				},
				popover: {
					DEFAULT: '#ffffff',
					foreground: '#000000',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
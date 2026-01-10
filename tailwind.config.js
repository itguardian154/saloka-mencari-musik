import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Figtree',
					...defaultTheme.fontFamily.sans
				]
			},
			colors: {
				gossamer: {
					'50': '#eefbf5',
					'100': '#d5f6e5',
					'200': '#afebcf',
					'300': '#7adbb4',
					'400': '#44c395',
					'500': '#21a87b',
					'600': '#169870',
					'700': '#106c52',
					'800': '#0f5642',
					'900': '#0d4738',
					'950': '#062820'
				},
				'orange-peel': {
					'50': '#fffbeb',
					'100': '#fdf2c8',
					'200': '#fce38b',
					'300': '#fad04f',
					'400': '#f9bb26',
					'500': '#f39f19',
					'600': '#d77408',
					'700': '#b2510b',
					'800': '#913e0f',
					'900': '#773410',
					'950': '#441904'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			animation: {
				'spin-slow': 'spin 18s linear infinite',
				'spin-reverse': 'spin 22s linear infinite reverse',
				'beat-pulse': 'pulse 3s ease-in-out infinite',
				'stage-pulse': 'pulse 4s ease-in-out infinite',
				'eq': 'eq 1.4s ease-in-out infinite',
				'note-float-0': 'noteFloat 14s linear infinite',
				'note-float-1': 'noteFloat 16s linear infinite',
				'note-float-2': 'noteFloat 18s linear infinite',
				'note-float-3': 'noteFloat 20s linear infinite',
				'note-float-4': 'noteFloat 22s linear infinite',
				'note-float-5': 'noteFloat 24s linear infinite',
				'note-float-6': 'noteFloat 26s linear infinite',
				'note-float-7': 'noteFloat 28s linear infinite',
			},
			keyframes: {
				noteFloat: {
					'0%': { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
					'20%': { opacity: 0.4 },
					'100%': { transform: 'translateY(-120vh) rotate(360deg)', opacity: 0 },
				},
				eq: {
					'0%,100%': { height: '20%' },
					'50%': { height: '100%' },
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};

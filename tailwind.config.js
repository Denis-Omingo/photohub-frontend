/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,css}"],
	theme: {
	  extend: {
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)',
		  },
		  colors: {
			background: '#FFFFFF',  // White background
			foreground: '#001F3F',  // Navy Blue for general text
			card: {
			  DEFAULT: '#FFFFFF',  // White for cards
			  foreground: '#001F3F',  // Navy Blue text in cards
			},
			popover: {
			  DEFAULT: '#FFFFFF',  // White popovers
			  foreground: '#001F3F',  // Navy Blue text in popovers
			},
			primary: {
			  DEFAULT: '#008080',  // Teal primary color
			  foreground: '#FFFFFF',  // White text on primary backgrounds
			},
			secondary: {
			  DEFAULT: '#001F3F',  // Navy Blue as the secondary color
			  foreground: '#FFFFFF',  // White text on secondary backgrounds
			},
			muted: {
			  DEFAULT: '#f3f4f6',  // Light gray for muted elements
			  foreground: '#6b7280',  // Gray text for muted
			},
			accent: {
			  DEFAULT: '#FFFFFF',  // White as the accent color
			  foreground: '#008080',  // Teal for accent text
			},
			destructive: {
			  DEFAULT: '#dc2626',  // Red for destructive actions
			  foreground: '#FFFFFF',  // White text on destructive backgrounds
			},
			border: '#e5e7eb',  // Light gray for borders
			input: '#f9fafb',  // Very light gray for input backgrounds
			ring: '#008080',  // Teal for focus rings
			chart: {
			  '1': '#008080',  // Teal
			  '2': '#001F3F',  // Navy Blue
			  '3': '#FFFFFF',  // White
			  '4': '#6b7280',  // Gray
			  '5': '#dc2626',  // Red
			},
		  },
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
  
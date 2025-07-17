import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: ['var(--font-poppins)', 'sans-serif'],
        bungee: ['var(--font-bungee)', 'sans-serif']

      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'rgb(var(--bg-general) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        section: 'rgb(var(--section) / <alpha-value>)',
        'btn-blue': 'rgb(var(--primary-button) / <alpha-value>)',
        'btn-blue-hover': 'rgb(var(--primary-button-hover) / <alpha-value>)',
        'btn-red': 'rgb(var(--red-button) / <alpha-value>)',
        'btn-red-hover': 'rgb(var(--red-button-hover) / <alpha-value>)',
        'btn-gray': 'rgb(var(--gray-button) / <alpha-value>)',
        'btn-gray-hover': 'rgb(var(--gray-button-hover) / <alpha-value>)',
        'stats': 'rgb(var(--stats)/<alpha-value>)',
        'stats-hover': 'rgb(var(--stats-hover)/<alpha-value>)',
        'gray-heading': 'rgb(var(--text-gray-heading)/<alpha-value>)',
        'gray-subheading': 'rgb(var(--text-gray-subheading)/<alpha-value>)',
        'text-error': 'rgb(var(--text-error)/<alpha-value>)',
        'logo-color': 'rgb(var(--text-logo)/<alpha-value>)',

        card: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        },
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
          foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {


        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: "translateX(20px)" },
          to: { opacity: '1', transform: "translateX(0)" },
        },
        fadeOut: {
          from: { opacity: '1', transform: "translateX(0)" },
          to: { opacity: '0', transform: "translateX(20px)" },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

    },
  },
  plugins: [require('tailwindcss-animate')],

};

export default config;

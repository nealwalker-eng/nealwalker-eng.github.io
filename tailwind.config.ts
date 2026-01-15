import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#003366',
        'medium-blue': '#004080',
        'black-primary': '#000000',
        'dark-gray': '#4D4D4D',
        'medium-gray': '#6c757d',
        'light-gray': '#f8f9fa',
        'very-light-gray': '#e9ecef',

        white: '#FFFFFF',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #003366, #004080)',
      },
      boxShadow: {
        soft: '0 4px 6px rgba(0,0,0,0.1)',
        medium: '0 10px 15px rgba(0,0,0,0.2)',
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        body: ['var(--font-work-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

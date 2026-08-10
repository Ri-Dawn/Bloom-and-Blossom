import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        stone50: '#F8F1EA',
        stone100: '#EFE1D1',
        stone300: '#D8C4AC',
        stone500: '#A98B68',
        stone900: '#2A211A',
        rani: '#B0225A',
        raniDark: '#8E1B48',
        marigold: '#E0912A',
        ivoryGold: '#D9B36C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        hand: ['var(--font-hand)', 'cursive'],
      },
      borderRadius: {
        DEFAULT: '2px',
      },
      backdropBlur: {
        glass: '18px',
      },
    },
  },
  plugins: [],
};

export default config;

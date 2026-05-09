import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#6595A8',
          hover: '#365A69',
        },
        'off-white': '#F5F5F5',
        'off-black': '#212121',
      },
      fontFamily: {
        italiana: ['var(--font-italiana)', 'Georgia', 'serif'],
        raleway: ['var(--font-raleway)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

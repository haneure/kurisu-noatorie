import typography from '@tailwindcss/typography' // Correct ES module import
import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate' // Correct import for animation plugin

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/ui/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        // Tailwind will automatically apply max-widths for each screen
        xs: '100%', // 👈 now handles iPhone SE/small screens
        sm: '640px', // ≥640px
        md: '768px', // ≥768px
        lg: '1024px', // ≥1024px
        xl: '1280px',
        '2xl': '1536px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif']
      },
      colors: {
        badge: 'var(--badge)',
        noatorie: '#edf2f7'
      }
    }
  },
  plugins: [typography, tailwindcssAnimate]
}
export default config

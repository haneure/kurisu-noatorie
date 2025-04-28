import typography from '@tailwindcss/typography'; // Correct ES module import
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate'; // Correct import for animation plugin

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
        center: true,
        padding: '2rem',
        screens : {
        // Tailwind will automatically apply max-widths for each screen
        xs: '100%',        // 👈 now handles iPhone SE/small screens
        sm: '640px',        // ≥640px
        md: '768px',        // ≥768px
        lg: '1024px',       // ≥1024px
        xl: '1280px',
        '2xl': '1536px',
        }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
      colors: {
      'hover-overlay-initial': {
          DEFAULT: 'rgba(255, 255, 255, 0.5)',  // light mode initial (white/50)
          dark: 'rgba(0, 0, 0, 0.5)',           // dark mode initial (black/50)
        },
        'hover-overlay-hover': {
          DEFAULT: 'rgba(0, 0, 0, 0.1)',        // light mode hover (black/10)
          dark: 'rgba(255, 255, 255, 0.1)',      // dark mode hover (white/10)
        },
      }
    },
  },
  plugins: [
      typography,
      tailwindcssAnimate
  ],
}
export default config

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: {
          950: '#05050a',
          900: '#08080f',
          800: '#0d0d18',
          700: '#11111f',
          600: '#161628',
        },
        grimoire: {
          900: '#130e08',
          800: '#1e1710',
          700: '#2a1e12',
          600: '#3d2c1a',
          500: '#5c4035',
          400: '#7a5845',
        },
        gold: {
          DEFAULT: '#c8960c',
          50: '#fef9e7',
          100: '#fdf0c4',
          200: '#fae28a',
          300: '#f7ce50',
          400: '#f4ba27',
          500: '#e8a512',
          600: '#c8960c',
          700: '#a07710',
          800: '#8b6914',
          900: '#6b5010',
          950: '#3d2d04',
        },
        blood: {
          DEFAULT: '#8b0000',
          light: '#c0392b',
          muted: '#4a0808',
          dark: '#2d0303',
        },
        parchment: {
          DEFAULT: '#e8d5b7',
          light: '#f5ead6',
          muted: '#a89880',
          dark: '#6b5b45',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        crimson: ['Crimson Text', 'serif'],
      },
      backgroundImage: {
        'gothic-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8960c' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-12px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 4px rgba(200, 150, 12, 0.3)' },
          '50%': { boxShadow: '0 0 12px rgba(200, 150, 12, 0.7)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
          '75%': { opacity: '0.95' },
        },
      },
      boxShadow: {
        'gold': '0 0 12px rgba(200, 150, 12, 0.4)',
        'gold-sm': '0 0 6px rgba(200, 150, 12, 0.25)',
        'blood': '0 0 12px rgba(139, 0, 0, 0.4)',
        'inner-dark': 'inset 0 2px 8px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}

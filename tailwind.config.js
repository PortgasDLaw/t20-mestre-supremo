/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds — spec §Design Tokens / Cores
        abyss: {
          950: '#0E0A12',  // bgBody
          900: '#150f1b',  // bgSidebar
          800: '#1A141E',  // bgPanel / cards
          700: '#120d16',  // bgPanelDark / stat boxes, inputs
          600: '#0f0b13',  // bgPanelDeep / portrait, header dark
        },
        grimoire: {
          900: '#0f0b13',
          800: '#120d16',
          700: '#1A141E',
          600: '#251c2e',  // border / separator
          500: '#4a3560',
          400: '#6a4a80',
        },
        // Dourado — destaque principal
        gold: {
          DEFAULT: '#C89B3C',
          50:  '#fef9e7',
          100: '#fdf0c4',
          200: '#f0e4c8',   // goldBright
          300: '#E4C16A',   // goldLight
          400: '#E4C16A',
          500: '#C89B3C',   // gold base
          600: '#C89B3C',
          700: '#9a8e7c',   // goldDim
          800: '#7a6030',
          900: '#5a4a20',
          950: '#1a1208',
        },
        blood: {
          DEFAULT: '#8B1A1A',
          light:  '#E05040',
          muted:  '#5a1010',
          dark:   '#2d0303',
        },
        parchment: {
          DEFAULT: '#E8DFCF',  // textPrimary
          light:   '#F0E4C8',  // goldBright
          muted:   '#a99c86',  // textSecondary
          dark:    '#6e6356',  // textFaint
        },
        // Raridades
        rarity: {
          comum:    '#8A93A6',
          raro:     '#4F8FD6',
          epico:    '#A461E8',
          lendario: '#E0733B',
        },
        // Escolas de magia
        escola: {
          evocacao:     '#E0733B',
          abjuracao:    '#4F8FD6',
          adivinhacao:  '#C9A23B',
          encantamento: '#D06AC9',
          ilusao:       '#A461E8',
          necromancia:  '#6E9A52',
          conjuracao:   '#4FB0C6',
          transmutacao: '#C77F3A',
        },
        // ND de Ameaças
        nd: {
          facil:  '#6E9A52',
          baixo:  '#4FB0C6',
          medio:  '#4F8FD6',
          alto:   '#A461E8',
          perigo: '#E0733B',
          mortal: '#E05040',
        },
      },
      fontFamily: {
        cinzel:    ['Cinzel', 'serif'],
        'cinzel-deco': ['Cinzel Decorative', 'serif'],
        crimson:   ['EB Garamond', 'Crimson Text', 'Georgia', 'serif'],
        garamond:  ['EB Garamond', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gothic-pattern': "radial-gradient(130% 90% at 50% -15%, #221629 0%, #120d17 52%, #0c0810 100%)",
        'sidebar-gradient': "linear-gradient(176deg, #1b1420 0%, #150f1b 55%, #100b15 100%)",
        'panel-gradient':   "linear-gradient(180deg, #1a141e, #16111b)",
        'modal-gradient':   "radial-gradient(130% 90% at 50% -8%, #251a2e 0%, #19121f 55%, #140e19 100%)",
        'gold-gradient':    "linear-gradient(180deg, #d6a948, #b3852f)",
      },
      animation: {
        'fade-in':    'fadeIn 0.22s ease',
        'page-open':  'pageOpen 0.36s cubic-bezier(0.2, 0.85, 0.25, 1)',
        'slide-in':   'slideIn 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'flicker':    'flicker 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pageOpen: {
          '0%':   { opacity: '0', transform: 'translateY(16px) scale(0.94)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        slideIn: {
          '0%':   { transform: 'translateX(-12px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 4px rgba(200,155,60,0.3)' },
          '50%':      { boxShadow: '0 0 12px rgba(200,155,60,0.7)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.85' },
          '75%':      { opacity: '0.95' },
        },
      },
      boxShadow: {
        'gold':       '0 0 12px rgba(200,155,60,0.4)',
        'gold-sm':    '0 0 6px rgba(200,155,60,0.25)',
        'blood':      '0 0 12px rgba(139,26,26,0.4)',
        'inner-dark': 'inset 0 2px 8px rgba(0,0,0,0.6)',
        'card':       '0 10px 28px rgba(0,0,0,0.55)',
        'modal':      '0 44px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,155,60,0.30), inset 0 0 60px rgba(0,0,0,0.4)',
        'panel':      '0 20px 50px rgba(0,0,0,0.5)',
        'sidebar':    'inset -14px 0 30px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
}

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    borderRadius: {
      DEFAULT: '0.25rem',
      "1" : "55px",
      "2" : "6px 6px 12px 12px",
      'none': '0',
      'sm': '0.125rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      'full': '9999px',
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
     '3': '3px',
      '4': '4px',
     '6': '6px',
     '8': '8px',
     '10': '10px',
    },
    letterSpacing: {
      widest: '.20em',
     },
    fontFamily: {
      'sans': ['Arial'],
      'logo': ['Bellefair', 'Arial']
     },
    extend: {
      gridTemplateRows: {
        '18': 'repeat(18, minmax(0, 1fr))',
      },
      gridRow: {
        'span-9': 'span 9 / span 9',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 18 / span 18',
      },
      gridRowStart: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
        '18': '18',
      },
      colors: {
        'yellow-col': '#D28B02',
        'yel': '#EFA332',
        'per': '#BA53EB',
        'per-a': '#8E00D0',
      },
      dropShadow: {
        '2xl': '0px 2px 3px rgba(0, 0, 0, 0.5)',
        '3xl': '0px 6px 2px rgba(0, 0, 0, 0.5)',
        '4xl': '0px 0px 8px rgba(0, 0, 0, 0.5)',
      },
      boxShadow: {
        'try': '0 8px 15px 2px rgba(0, 0, 0, 0.8)',
        'try2': '0 6px 8px 0px rgba(0, 0, 0, 0.8)',
        '1': '0px 4px 4px rgba(0, 0, 0, 0.5)',
        '25': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      margin: {
        '16': '4.5rem',
       },
      fontFamily: {
        david: ["David Libre", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

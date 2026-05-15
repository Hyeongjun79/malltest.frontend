const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        ibm: {
          blue: '#0f62fe',
          'blue-hover': '#0050e6',
          'blue-60': '#0043ce',
          'blue-80': '#002d9c',
          ink: '#161616',
          'ink-muted': '#525252',
          'ink-subtle': '#8c8c8c',
          canvas: '#ffffff',
          'surface-1': '#f4f4f4',
          'surface-2': '#e0e0e0',
          'surface-3': '#393939',
          'surface-4': '#e8e8e8',
          hairline: '#e0e0e0',
          'hairline-strong': '#161616',
          'inverse-canvas': '#161616',
          'inverse-surface-1': '#262626',
          'inverse-ink': '#ffffff',
          'inverse-ink-muted': '#c6c6c6',
          success: '#24a148',
          warning: '#f1c21b',
          error: '#da1e28',
          'error-hover': '#b81921',
        },
      },
      letterSpacing: {
        carbon: '0.16px',
        'carbon-caption': '0.32px',
        'carbon-display': '-0.5px',
      },
      borderRadius: {
        none: '0px',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        'html, body': {
          fontFamily: theme('fontFamily.sans'),
          backgroundColor: theme('colors.ibm.canvas'),
          color: theme('colors.ibm.ink'),
          letterSpacing: '0.16px',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '*, *::before, *::after': {
          borderRadius: '0 !important',
        },
        'input, button, select, textarea': {
          fontFamily: 'inherit',
        },
      })

      addUtilities({
        '.ibm-rounded-sm': { borderRadius: '4px !important' },
        '.ibm-rounded-md': { borderRadius: '12px !important' },
        '.ibm-rounded-lg': { borderRadius: '20px !important' },
        '.ibm-rounded-full': { borderRadius: '9999px !important' },
      })

      addComponents({
        '.ibm-dxl-76': {
          fontSize: '76px',
          fontWeight: '300',
          lineHeight: '1.17',
          letterSpacing: '-0.5px',
        },
        '.ibm-dlg-60': {
          fontSize: '60px',
          fontWeight: '300',
          lineHeight: '1.17',
          letterSpacing: '-0.4px',
        },
        '.ibm-dmd-42': {
          fontSize: '42px',
          fontWeight: '300',
          lineHeight: '1.2',
        },
        '.ibm-h-32': {
          fontSize: '32px',
          fontWeight: '400',
          lineHeight: '1.25',
        },
        '.ibm-ct-24': {
          fontSize: '24px',
          fontWeight: '400',
          lineHeight: '1.33',
        },
        '.ibm-sh-20': {
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: '1.4',
        },
        '.ibm-blg-18': {
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: '1.5',
        },
        '.ibm-b-16': {
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '1.5',
          letterSpacing: '0.16px',
        },
        '.ibm-bsm-14': {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '1.29',
          letterSpacing: '0.16px',
        },
        '.ibm-be-14': {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '1.29',
          letterSpacing: '0.16px',
        },
        '.ibm-c-12': {
          fontSize: '12px',
          fontWeight: '400',
          lineHeight: '1.33',
          letterSpacing: '0.32px',
        },
        '.ibm-e-14': {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '1.29',
          letterSpacing: '0.16px',
          color: theme('colors.ibm.ink-muted'),
        },

        '.ibm-btn': {
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '1.29',
          letterSpacing: '0.16px',
          padding: '12px 16px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
          minHeight: '48px',
          transition: 'background-color 0.11s ease',
          cursor: 'pointer',
          border: '1px solid transparent',
        },
        '.ibm-btn-primary': {
          backgroundColor: theme('colors.ibm.blue'),
          color: theme('colors.ibm.canvas'),
          '&:hover': { backgroundColor: theme('colors.ibm.blue-hover') },
          '&:active': { backgroundColor: theme('colors.ibm.blue-80') },
        },
        '.ibm-btn-secondary': {
          backgroundColor: theme('colors.ibm.ink'),
          color: theme('colors.ibm.canvas'),
          '&:hover': { backgroundColor: theme('colors.ibm.surface-3') },
        },
        '.ibm-btn-tertiary': {
          backgroundColor: 'transparent',
          color: theme('colors.ibm.blue'),
          borderColor: theme('colors.ibm.blue'),
          '&:hover': {
            backgroundColor: theme('colors.ibm.blue-hover'),
            color: theme('colors.ibm.canvas'),
          },
        },
        '.ibm-btn-ghost': {
          backgroundColor: 'transparent',
          color: theme('colors.ibm.blue'),
          '&:hover': { backgroundColor: theme('colors.ibm.surface-4') },
        },
        '.ibm-btn-danger': {
          backgroundColor: theme('colors.ibm.error'),
          color: theme('colors.ibm.canvas'),
          '&:hover': { backgroundColor: theme('colors.ibm.error-hover') },
        },

        '.ibm-input': {
          backgroundColor: theme('colors.ibm.surface-1'),
          color: theme('colors.ibm.ink'),
          fontSize: '16px',
          lineHeight: '1.5',
          letterSpacing: '0.16px',
          padding: '11px 16px',
          border: '0',
          borderBottom: `1px solid ${theme('colors.ibm.ink-subtle')}`,
          width: '100%',
          transition: 'border-color 0.11s ease',
          '&:focus': {
            outline: `2px solid ${theme('colors.ibm.blue')}`,
            outlineOffset: '-2px',
            borderBottomColor: 'transparent',
          },
          '&[type="number"]::-webkit-outer-spin-button, &[type="number"]::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: '0',
          },
          '&[type="number"]': {
            MozAppearance: 'textfield',
          },
        },

        '.ibm-card': {
          backgroundColor: theme('colors.ibm.canvas'),
          border: `1px solid ${theme('colors.ibm.hairline')}`,
          padding: '24px',
        },
        '.ibm-card-elevated': {
          backgroundColor: theme('colors.ibm.surface-1'),
          border: `1px solid ${theme('colors.ibm.hairline')}`,
          padding: '24px',
        },
      })
    }),
  ],
}

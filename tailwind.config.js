/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  darkMode: 'class',
  safelist: [
    {
      pattern: /bg-(red|green|blue)-(100)/,
      variants: ['group-hover']
    },
    {
      pattern: /text-(red|green|blue)-(400)/,
      variants: ['group-hover']
    },
    'bg-blue-400'
  ],
  theme: {
    screens: {
      xs: '614px',
      sm: '1002px',
      md: '1022px',
      lg: '1092px',
      xl: '1280px'
    },

    extend: {
      colors: {
        dim: {
          50: '#5F99F7',
          100: '#5F99F7',
          200: '#38444d',
          300: '#202e3a',
          400: '#253341',
          500: '#5F99F7',
          600: '#5F99F7',
          700: '#192734',
          800: '#162d40',
          900: '#15202b'
        }
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/forms')]
};

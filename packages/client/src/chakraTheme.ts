import { extendTheme, defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
  sizes: {
    lg: {
      width: '250px',
      height: '50px',
      fontSize: '20px',
    },
  },
});

const baseFont = 'Ubuntu Mono, sans-serif';
export const theme = extendTheme({
  components: {
    Button,
  },
  fonts: {
    body: baseFont,
    heading: baseFont,
    mono: baseFont,
  },
  colors: {
    lightBlue: '#CBFDFD',
    blue: '#4299E1',
    coral: '#FE6060',
    violet: '#3E1972',
    orange: '#FEBE60',
    red: '#E53E3E',
    white: '#FFF',
  },
  sizes: {
    '1.5xl': '39rem',
    '2xl': '40.5rem',
    '3.5xl': '46.5rem',
  },
});

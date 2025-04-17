import type { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: {
    'html, body': {
      fontFamily: 'body',
      color: 'chakra-body-text',
      bg: 'white',
      transitionProperty: 'background-color',
      transitionDuration: 'normal',
      lineHeight: 'base',
    },
    '*::placeholder': {
      color: 'chakra-placeholder-color',
    },
    '*, *::before, &::after': {
      borderColor: 'chakra-border-color',
      wordWrap: 'break-word',
    },
  },
};

export default styles;

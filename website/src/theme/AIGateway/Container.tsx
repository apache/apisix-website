import { defineStyleConfig } from '@chakra-ui/react';

const Container = defineStyleConfig({
  variants: {
    primary: {
      px: '20px',
    },
  },
  defaultProps: {
    variant: 'primary',
  },
});

export default Container;

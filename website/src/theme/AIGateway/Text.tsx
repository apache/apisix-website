import { defineStyleConfig } from '@chakra-ui/react';

const Text = defineStyleConfig({
  variants: {
    'heading-desc': {
      fontSize: ['18px', '20px'],
      fontWeight: '400',
    },
    p: {
      fontSize: ['16px'],
      fontWeight: '400',
      lineHeight: '1.5',
    },
  },
});

export default Text;

import { defineStyleConfig } from '@chakra-ui/react';

const Heading = defineStyleConfig({
  variants: {
    h1: {
      fontSize: ['36px', '56px'],
      fontWeight: '700',
      lineHeight: '1.33',
    },
    h2: {
      fontSize: ['32px', '44px'],
      fontWeight: '600',
      lineHeight: '1.33',
    },
    h3: {
      fontSize: ['24px', '32px'],
      fontWeight: '500',
      lineHeight: ['1.33', '1.5'],
    },
    h4: ({ colorScheme = 'brand' }) => {
      const color = colorScheme === 'black'
        ? 'blackAlpha.800'
        : `var(--chakra-colors-${colorScheme}-500)`;

      return {
        fontSize: ['20px', '24px'],
        fontWeight: '500',
        lineHeight: '1.2',
        color,
      };
    },
    h5: {
      fontSize: ['20px'],
      fontWeight: '500',
      lineHeight: '1.2',
    },
  },
});

export default Heading;

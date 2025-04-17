/* eslint-disable no-underscore-dangle */
import { defineStyleConfig } from '@chakra-ui/react';

const Link = defineStyleConfig({
  variants: {
    primary: (props) => {
      const { colorScheme = 'brand' } = props;

      const color = colorScheme === 'black'
        ? 'blackAlpha.800'
        : `var(--chakra-colors-${colorScheme}-400)`;
      const _hoverColor = colorScheme === 'black'
        ? 'blackAlpha.900'
        : `var(--chakra-colors-${colorScheme}-500)`;

      return {
        color,
        _hover: {
          color: _hoverColor,
          textDecorationColor: _hoverColor,
        },
      };
    },
  },
});

export default Link;

/* eslint-disable no-underscore-dangle */

const Button = {
  variants: {
    outline: {
      borderRadius: '5px',
      border: '1px solid transparent',
      outline: 'none',
      background:
        'linear-gradient(#fff, #fff) padding-box, var(--chakra-colors-gradient-500) border-box',
      _hover: {
        border: '1px solid transparent',
        outline: 'none',
        background:
          'linear-gradient(#fff, #fff) padding-box, var(--chakra-colors-gradient-500) border-box',
      },
    },
    primary: {
      background: 'brand.400',
      borderRadius: '5px',
    },
    gradient: {
      color: 'white',
      background: 'var(--chakra-colors-gradient-500)',
      overflow: 'hidden',
      borderRadius: '5px',
      _before: {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)',
        transition: 'all 0.65s',
      },
      _hover: {
        background: 'var(--chakra-colors-gradient-500)',
        _before: {
          left: '100%',
        },
      },
    },
    link: ({ colorScheme = 'brand' }) => {
      const color = colorScheme === 'black'
        ? 'blackAlpha.800'
        : `var(--chakra-colors-${colorScheme}-400)`;
      const _hoverColor = colorScheme === 'black'
        ? 'blackAlpha.900'
        : `var(--chakra-colors-${colorScheme}-500)`;

      return {
        color,
        fontWeight: 'normal',
        _hover: {
          color: _hoverColor,
          textDecoration: 'underline',
        },
      };
    },
  },
  defaultProps: {
    size: 'lg',
    variant: 'outline',
    colorScheme: 'brand',
  },
};

export default Button;

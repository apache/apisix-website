// ChakraWrapper.tsx
import type { ReactNode } from 'react';
import React from 'react';
import {
  theme as baseTheme,
  ChakraProvider, extendTheme,
} from '@chakra-ui/react';
import { theme as proTheme } from '@chakra-ui/pro-theme';
import styles from './AIGateway/style';
import Container from '../theme/AIGateway/Container';
import Heading from '../theme/AIGateway/Heading';
import Button from '../theme/AIGateway/Button';
import Text from '../theme/AIGateway/Text';
import Icon from '../theme/AIGateway/Icon';
import Link from '../theme/AIGateway/Link';

const theme = extendTheme(
  {
    initialColorMode: 'light',
    useSystemColorMode: false,
    components: {
      Text,
      Container,
      Heading,
      Button,
      Icon,
      Link,
    },
    // NOTE: https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/foundations/colors.ts
    colors: {
      ...baseTheme.colors,
      brand: {
        50: '#e2eaff',
        100: '#b1c0ff',
        200: '#7f96ff',
        300: '#4c6dff',
        400: '#1a43ff',
        500: '#0029e6',
        600: '#0020b4',
        700: '#001782',
        800: '#000d51',
        900: '#000521',
      },
      main: {
        50: '#FBF9FF',
        100: '#F0EDF7',
        400: '#5D5A88',
        500: '#070F54',
      },
      gradient: {
        400: 'linear-gradient(63deg, #070F54 8.54%, #E31836 79.08%)',
        500: 'linear-gradient(48deg, #070F54 15.09%, #E31836 143.77%)',
        600: 'linear-gradient(109.73deg, #6D49FF 26.23%, #FF4646 81.38%)',
      },
    },
    styles,
  },
  proTheme,
);

interface ChakraWrapperProps {
  children: ReactNode;
}

export const ChakraWrapper: React.FC<ChakraWrapperProps> = ({ children }) => (
  <ChakraProvider theme={theme} resetCSS={false}>
    {children}
  </ChakraProvider>
);

export default ChakraWrapper;

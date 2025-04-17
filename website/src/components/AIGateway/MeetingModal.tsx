import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import React from 'react';

type MeetingButtonProps = {
  btnText: React.ReactNode;
} & ButtonProps;

const MeetingModalButton: React.FC<MeetingButtonProps> = ({
  btnText,
  variant = 'primary',
  ...rest
}) => (
  <Button
    as="a"
    target="_blank"
    href="/contact"
    variant={variant}
    position="relative"
    overflow="hidden"
    {...rest}
  >
    {btnText}
  </Button>
);

export default MeetingModalButton;

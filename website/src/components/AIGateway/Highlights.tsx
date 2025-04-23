import React from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Container,
  Stack,
  Button,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import AvifImage from './AvifImage';

import { useHighlights } from './data';

const Highlights: React.FC = () => {
  const highlights = useHighlights();
  return (
    <Box bg="#ffffff">
      <Container py={{ base: '35px', lg: '100px' }}>
        <Stack spacing={{ base: '12', lg: '20' }}>
          {highlights.map((item) => (
            <Flex
              key={item.title}
              alignItems="center"
              gap={{ base: '12', lg: '12' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Stack
                spacing={{ base: '6', lg: '24px' }}
                w={{ base: '100%', lg: '50%' }}
              >
                <Heading
                  as="h2"
                  variant="h2"
                >
                  {item.title}
                </Heading>
                <Text color="#44506F" fontSize={{ base: '18px', lg: '18px' }}>
                  {item.desc}
                </Text>
                <Button
                  w="150px"
                  as="a"
                  target="_blank"
                  href={item.link}
                  rightIcon={<ArrowForwardIcon />}
                  variant="gradient"
                >
                  Learn More
                </Button>
              </Stack>
              <Box
                w={{ base: '100%', lg: '50%' }}
                display="flex"
                justifyContent="space-around"
                as={motion.div}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.3 },
                }}
                viewport={{ once: true }}
              >
                <AvifImage
                  src={item.image}
                  alt={item.title}
                  width={{ base: '100%', lg: '100%' }}
                  height="auto"
                  objectFit="contain"
                  transform={`scale(${item.scale})`}
                />
              </Box>
            </Flex>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Highlights;

import React, { memo } from 'react';
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Grid,
  GridItem,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import AvifImage from './AvifImage';

import { useFeatures } from './data';

const Features: React.FC = () => {
  const features = useFeatures();
  return (
    <Box
      position="relative"
      bg="#030527"
      backgroundImage="radial-gradient(circle farthest-side at 0 100%,#131747,#030527 50%)"
      overflow="hidden"
    >
      <Box
        width="850px"
        height="630px"
        position="absolute"
        right="-25px"
        top="-25px"
        backgroundImage="url(https://static.api7.ai/uploads/2025/02/27/ZKZqx4Sg_ai_gateway_features_bg.avif)"
        backgroundSize="cover"
        backgroundPosition="0 0"
        filter="blur(5px)"
      />
      <Container py={{ base: '80px', lg: '120px' }}>
        <Grid
          as={motion.div as any}
          templateRows={{ md: 'repeat(3, 1fr)', lg: 'repeat(2, 1fr)' }}
          templateColumns={{
            base: 'repeat(4, 1fr)',
            md: 'repeat(8, 1fr)',
            lg: 'repeat(12, 1fr)',
          }}
          gap={6}
          position="relative"
          zIndex={10}
        >
          {features.map((item, index) => (
            <GridItem
              as={motion.div as any}
              key={item.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.2 + 0.1 * index },
              }}
              viewport={{ once: true }}
              colSpan={item.colSpan}
              color="#fff"
            >
              <Flex maxH="400px">
                <Stack
                  spacing="4"
                  p={{ base: '4', lg: '8' }}
                  justifyContent="center"
                >
                  <Box w="48px" h="48px" p="1px" borderRadius="8px">
                    <Box
                      background="#0f2151"
                      borderRadius="8px"
                      height="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <AvifImage
                        src={item.icon}
                        alt={item.title}
                        boxSize="28px"
                      />
                    </Box>
                  </Box>
                  <Heading as="h4" variant="h4" color="#fff">
                    {item.title}
                  </Heading>
                  <Text color="#c5cae8">{item.description}</Text>
                </Stack>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default memo(Features);

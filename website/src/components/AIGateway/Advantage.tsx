import React from 'react';
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Grid,
  GridItem,
  Button,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAdvantages } from './data';

import AvifImage from './AvifImage';

const Advantage: React.FC = () => {
  const advantages = useAdvantages();

  return (
    <Box bg="#f9f9fb">
      <Container py={{ base: '72px', lg: '120px' }}>
        <Box textAlign="center" mb={{ base: '48px', lg: '80px' }}>
          <Heading
            as="h2"
            variant="h2"
          >
            Transform APISIX into an AI Gateway with AI Plugins
          </Heading>
          <Button
            as="a"
            href="https://apisix.apache.org/docs/apisix/next/plugins/ai-proxy/"
            target="_blank"
            w={{ base: '158px', lg: 'auto' }}
            h={{ base: '46px', lg: '48px' }}
            variant="gradient"
            mt="8"
          >
            Read the Docs
          </Button>
        </Box>
        <Grid
          as={motion.div as any}
          templateRows={{
            base: 'repeat(1, 1fr 0.5fr)',
            lg: 'repeat(1, 1fr 0.5fr)',
          } as const}
          templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={6}
        >
          {/* the first three list */}
          {advantages.slice(0, 3).map((item, index) => (
            <GridItem
              gridArea={{ base: item.mobileArea, lg: item.gridArea }}
              as={motion.div as any}
              key={item.title as string}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.2 + 0.1 * index },
              }}
              viewport={{ once: true }}
              bg="#ffffff"
              borderRadius="8px"
              display={{ base: 'flex', lg: 'unset' }}
              alignItems={{ base: 'center' }}
              justifyContent="center"
            >
              <Stack
                spacing="4"
                px={{ base: '4', lg: '8' }}
                py="10"
                alignItems="center"
                textAlign="center"
              >
                {item.icon && (
                  <Box
                    w="48px"
                    h="48px"
                    p="1px"
                    background="linear-gradient(to right, #8F41E9, #578AEF)"
                    borderRadius="8px"
                  >
                    <Box
                      background="#fff"
                      borderRadius="8px"
                      height="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Icon as={item.icon as any} boxSize="28px" color="brand.500" />
                    </Box>
                  </Box>
                )}
                <Heading
                  as="h4"
                  variant="h4"
                  fontSize={{ base: '26px', lg: '28px' }}
                  bg="var(--chakra-colors-gradient-600)"
                  bgClip="text"
                  {...item.titleStyle}
                >
                  {item.title}
                </Heading>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color="#656b8a"
                  letterSpacing="-0.2px"
                >
                  {item.description}
                </Text>
              </Stack>
            </GridItem>
          ))}
          {/* the last list */}
          {advantages.slice(3, 4).map((item) => (
            <GridItem
              gridArea={{ base: item.mobileArea, lg: item.gridArea }}
              as={motion.div as any}
              key={item.title as string}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.6 },
              }}
              viewport={{ once: true }}
              bg="#ffffff"
              borderRadius="8px"
            >
              <Stack
                spacing="6"
                px={{ base: '6', lg: '12' }}
                py="10"
                alignItems="left"
                textAlign={{ base: 'left', lg: 'left' }}
              >
                <Heading
                  as="h4"
                  variant="h4"
                  fontSize={{ base: '26px', lg: '32px' }}
                  {...item.titleStyle}
                >
                  {item.title}
                </Heading>
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '19px' }}
                    lineHeight="1.6"
                    color="#656b8a"
                  >
                    {item.description}
                  </Text>
                  <AvifImage
                    src={item.picture}
                    alt=""
                    height="50px"
                    w="full"
                    objectFit="contain"
                    transform={{ base: 'scale(1.03)', lg: 'scale(1.12)' }}
                    mt={{ base: '30px', lg: '50px' }}
                  />
                </Box>
              </Stack>
            </GridItem>
          ))}
        </Grid>

        <Box
          as={motion.div}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { delay: 0.7 } }}
          viewport={{ once: true }}
          mt={{ base: '60px', lg: '80px' }}
        >
          <Box
            position="relative"
            width="100%"
            height={{ base: 'auto', md: '600px', lg: '810px' }}
            display={{ base: 'none', md: 'inherit' }}
          >
            <AvifImage
              src="https://static.api7.ai/uploads/2025/04/17/OzCNXRTl_apisix-ai-gateway-architecture.png"
              alt="AI Gateway Architecture"
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>

          {/* Mobile */}
          <Box maxW="full" mx="auto" display={{ base: 'unset', md: 'none' }}>
            <AvifImage
              src="https://static.api7.ai/uploads/2025/04/17/ykJ74KyV_apisix-ai-gateway-mobile.png"
              alt="AI Gateway Architecture"
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Advantage;

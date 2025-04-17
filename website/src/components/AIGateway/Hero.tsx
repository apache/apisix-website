import React from 'react';
import {
  Box,
  Text,
  Heading,
  Container,
  Stack,
  keyframes,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import AvifImage from './AvifImage';

// animation
const fadeIn = keyframes`
  0% {
    transform: translateY(5%);
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1.1);
  }
`;

const Hero: React.FC = () => {
  const fadeInAnimation = `${fadeIn} 0.5s linear`;

  return (
    <Box w="full" background="#FFF" py={{ base: '45px', lg: '40px' }}>
      <Container display="flex" mb={{ base: '15px', lg: '30px' }}>
        <Grid templateColumns="repeat(12, 1fr)" gap={{ base: '8', lg: '4' }}>
          <GridItem
            colSpan={{ base: 12, lg: 6 }}
            py={{ base: '4', lg: '14' }}
          >
            <Stack spacing="4">
              <Heading
                as="h1"
                variant="h1"
                sx={{ lineHeight: '1.15' }}
              >
                AI Gateway for AI Agents and LLMs
              </Heading>
              <Text
                fontSize="19px"
                fontStyle="normal"
                sx={{ lineHeight: '28.5px' }}
              >
                Discover how Apache APISIX serves as an AI gateway with AI proxy,
                LLMs load balancing, retry and fallback, token rate limiting,
                and security for efficient and reliable AI agents.
              </Text>
            </Stack>
          </GridItem>
          <GridItem
            colSpan={{ base: 12, lg: 6 }}
            justifySelf={{ base: 'center', lg: 'end' }}
            display="flex"
            alignItems="center"
          >
            <Box w="full">
              <AvifImage
                src="https://static.api7.ai/uploads/2025/04/17/zdPVQ1zg_apisix-ai-gateway.png"
                alt=""
                animation={fadeInAnimation}
                w="full"
                transform="scale(1.1)"
              />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;

import { Box, Flex, Heading, Image, SimpleGrid } from '@chakra-ui/react';

import { SignUpForm, Link } from '@app/components';

import logo from '../../assets/images/logo.jpg';

const enum RegisterText {
  heading = 'New player',
}

const registerTexts = {
  link: 'Already have account',
};

export function RegisterPage() {
  return (
    <SimpleGrid columns={2} spacingX={12} p={12} minChildWidth="lg" h="100%" w="100%" maxW="1800px">
      <Image src={logo} width="xl" minWidth="lg" alt="Game logo" />
      <Box width="xl">
        <Heading as="h1" mb="5" size="4xl">
          {RegisterText.heading}
        </Heading>
        <Box width="2xl" height="3xl" bg="lightBlue" borderRadius={5} p={10} mb={8}>
          <Flex gap={8} direction="column">
            <SignUpForm />
            <Link to="/login" textAlign="center" fontSize="xl">
              {registerTexts.link.toUpperCase()}
            </Link>
          </Flex>
        </Box>
      </Box>
    </SimpleGrid>
  );
}

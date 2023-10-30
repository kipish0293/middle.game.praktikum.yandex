import { Box, Flex, Heading, Image, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';

import { ErrorBoundary, Link, SignUpForm } from '@app/components';
import { Routes, TEXT } from '@app/const';

import logo from '../../assets/images/logo.jpg';

export function RegisterPage() {
  const [imageLoadError, setImageLoadError] = useState(false);

  return (
    <SimpleGrid columns={2} spacingX={12} p={12} minChildWidth="lg" h="100%" w="100%" maxW="1800px">
      <ErrorBoundary errorDeploy={imageLoadError} componentName="Register Logo">
        <Image
          src={logo}
          onError={() => setImageLoadError(true)}
          width="xl"
          minWidth="lg"
          alt="Game logo"
        />
      </ErrorBoundary>
      <Box width="xl">
        <Heading as="h1" mb="5" size="4xl">
          {TEXT.registerHeading}
        </Heading>
        <Box width="1.5xl" height="3.5xl" bg="lightBlue" borderRadius={5} p={10}>
          <Flex gap={2} h="100%" justifyContent="space-between" direction="column">
            <SignUpForm />
            <Link to={Routes.SIGNIN} textAlign="center" fontSize="xl">
              {TEXT.loginLink}
            </Link>
          </Flex>
        </Box>
      </Box>
    </SimpleGrid>
  );
}

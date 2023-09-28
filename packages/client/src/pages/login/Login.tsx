import { Box, Center, Container, Flex, Heading, Image } from '@chakra-ui/react';

import { LoginForm, Link } from '@app/components';
import { Routes, TEXT } from '@app/const';

import logo from '../../assets/images/logo_login.jpg';

export function LoginPage() {
  return (
    <Container pb={6} maxW="1800px">
      <Center flexDirection="column">
        <Image src={logo} width="5xl" height="xl" minWidth="lg" alt="Game logo" flex-shrink="0" />
        <Heading as="h1" mb="5" size="4xl">
          {TEXT.loginHeading}
        </Heading>
        <Box width="3.5xl" bg="lightBlue" borderRadius={5} pb={2} pt={3}>
          <Flex gap={2.5} direction="column">
            <LoginForm />
            <Link to={Routes.REGISTER} textAlign="center" fontSize="xl">
              {TEXT.registerLink}
            </Link>
          </Flex>
        </Box>
      </Center>
    </Container>
  );
}

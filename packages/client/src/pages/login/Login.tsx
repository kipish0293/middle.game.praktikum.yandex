import { Box, Button, Center, Container, Flex, Heading, Image, Spinner } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { OauthApi } from '@app/api';
import { Icons, Link, LoginForm } from '@app/components';
import { Routes, TEXT } from '@app/const';
import { useAppDispatch } from '@app/hooks';
import { getUser, userSliceActions } from '@app/store';

import logo from '../../assets/images/logo_login.jpg';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const oauthApi = new OauthApi();
  const [searchParameters] = useSearchParams();
  const [loadPage, setLoadPage] = useState(false);
  const reference = useRef(null);
  let origin: Location | string = '';
  if (typeof window !== 'undefined') {
    origin = window.location.origin;
  }
  const code = searchParameters.get('code');

  const oauthLogin = async (error: React.MouseEvent<HTMLElement>) => {
    error.stopPropagation();

    try {
      const response = await oauthApi.getOauthServiceId();
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { service_id: serviceId } = response;

      dispatch(userSliceActions.setServiceId(serviceId));

      if (typeof window !== 'undefined') {
        // eslint-disable-next-line max-len
        window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${origin}/signin`;
      }
    } catch (error_) {
      console.error(error_);
    }
  };

  const signInRequest = async (appCode: string) => {
    try {
      await oauthApi.postOauthServiceByCode({
        code: appCode,
        redirect_uri: `${origin}/signin`,
      });

      await dispatch(getUser());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (reference.current && !loadPage) {
      setLoadPage(true);
    }
  }, [reference]);

  useEffect(() => {
    if (loadPage && code) {
      signInRequest(String(code));
    }
  }, [loadPage, code]);

  return code ? (
    <Center h="100vh">
      <Spinner size="xl" ref={reference} />
    </Center>
  ) : (
    <Container pb={6} maxW="1800px" ref={reference}>
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
            <Flex justifyContent="center">
              <Button
                colorScheme="blackAlpha"
                size="md"
                type="button"
                onClick={oauthLogin}
                leftIcon={<Icons.Yandex />}
                bg="#000"
                width="300px"
                borderRadius="12px"
              >
                Войти через Яндекс
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Center>
    </Container>
  );
}

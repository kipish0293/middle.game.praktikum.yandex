import { Box, Button, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { GoBackIcon, Link } from '@app/components';

import Robot from '../../assets/images/robot.png';
import './NotFound.css';

export function NotFoundPage() {
  return (
    <Center h="100vh">
      <Flex flexDirection="column" alignItems="center">
        <Flex alignItems="center">
          <Heading as="h1" size="4xl" className="not-found__title" fontWeight={400}>
            ERROR
            <Flex>
              <Text>4</Text>
              <Text className="not-found__code_central">0</Text>
              <Text>4</Text>
            </Flex>
          </Heading>
          <Box boxSize="md" position="relative" mb={20}>
            <Image src={Robot} alt="ERROR ROBOT" align="center" />
            <Button variant="link" className="not-found__go-back-button">
              <Link className="not-found__go-back-link" to="/">
                <GoBackIcon />
                Go back
              </Link>
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Center>
  );
}

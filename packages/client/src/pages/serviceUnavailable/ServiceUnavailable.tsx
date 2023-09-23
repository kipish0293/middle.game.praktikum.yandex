import { Box, Button, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { GoBackIcon, Link } from '@app/components';

import Robot from '../../assets/images/robot.png';

import styles from './ServiceUnavailable.module.css';

const GO_HOME_TEMPLATE = 'Go home';

export function ServiceUnavailable() {
  return (
    <Center h="100vh">
      <Flex flexDirection="column" alignItems="center">
        <Flex alignItems="center">
          <Heading as="h1" size="4xl" className={styles.title} fontWeight={400}>
            ERROR
            <Flex>
              <Text>5</Text>
              <Text className={styles.code_central}>0</Text>
              <Text>3</Text>
            </Flex>
          </Heading>
          <Box boxSize="md" position="relative">
            <Image src={Robot} alt="ERROR ROBOT" align="center" />
          </Box>
        </Flex>
        <Flex mb={20}>
          <Button variant="link" className="service-unavailable__go-back-button">
            <Link
              className={styles.link}
              fontWeight="normal"
              fontSize="2xl"
              lineHeight={7}
              color="black"
              to="/"
            >
              <GoBackIcon />
              {GO_HOME_TEMPLATE}
            </Link>
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
}

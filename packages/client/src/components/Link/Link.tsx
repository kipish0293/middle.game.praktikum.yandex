import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { ReactElement } from 'react';

type Properties = {
  [x: string]: any;
};
export function Link(properties: Properties): ReactElement<Properties> {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ChakraLink as={ReactRouterLink} {...properties} />;
}

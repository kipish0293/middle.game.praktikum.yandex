import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { AnyObject } from '../../types/AnyObject';

export function Link(properties: AnyObject): ReactElement<AnyObject> {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ChakraLink as={ReactRouterLink} {...properties} />;
}

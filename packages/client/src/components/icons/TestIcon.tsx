/* eslint-disable max-len */
import { createIcon } from '@chakra-ui/icon';

export const TestIcon = createIcon({
  displayName: 'TestIcon',
  viewBox: '0 0 46 46',

  defaultProps: {
    fill: 'none',
    width: 46,
    height: 46,
  },
  path: (
    <>
      <circle cx="23" cy="23" r="23" fill="#4E5C6A" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.86 23.906c4.771 0 7.041 1.156 8.118 2.836.438.682.728 1.719.87 3.162a1.544 1.544 0 0 1-1.385 1.689l-.152.007H15.688a1.544 1.544 0 0 1-1.535-1.71c.166-1.536.473-2.607.921-3.262 1.086-1.588 3.296-2.682 7.786-2.722Zm.129-10.5a4.632 4.632 0 1 1 0 9.265 4.632 4.632 0 0 1 0-9.265Z"
        fill="#fff"
      />
    </>
  ),
});

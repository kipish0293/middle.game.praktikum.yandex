import { createIcon } from '@chakra-ui/icon';

export const Yandex = createIcon({
  displayName: 'Yandex',
  viewBox: '0 0 24 24',
  defaultProps: {
    fill: 'white',
    width: '24px',
    height: '24px',
  },
  path: (
    <>
      <rect x="0.5" width="24" height="24" rx="12" fill="#FC3F1D" />
      <path
        // eslint-disable-next-line max-len
        d="M14.1911 19.212H16.6981V4.81201H13.0515C9.38415 4.81201 7.45724 6.69748 7.45724 9.47388C7.45724 11.6909 8.51393 12.9962 10.3994 14.3429L7.12573 19.212H9.83998L13.4866 13.7628L12.2227 12.9133C10.6895 11.8773 9.94357 11.0693 9.94357 9.32885C9.94357 7.79561 11.021 6.75964 13.0722 6.75964H14.1911V19.212Z"
      />
    </>
  ),
});

export function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(import.meta.env.PROD ? `${import.meta.env.BASE_URL}sw.js` : '/sw.js')
        .then((registration) => {
          /* eslint-disable-next-line no-console */
          console.log('ServiceWorker registration successful with scope:', registration.scope);
        })
        .catch((error: string) => {
          /* eslint-disable-next-line no-console */
          console.log('ServiceWorker registration failed:', error);
        });
    });
  }
}

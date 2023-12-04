const CACHE_NAME = 'cache-name-v1';
const PROD_MODE = true;

const urlsForDev = [
  '/',
  '/src/assets/images/avatar.png',
  '/src/assets/images/game_over.png',
  '/src/assets/images/logo_login.jpg',
  '/src/assets/images/logo.jpg',
  '/src/assets/images/robot.png',
];

const urlsForProd = [
  '/',
  '/src/avatar.png',
  '/src/brick.svg',
  '/src/game_over.png',
  '/src/logo_login.jpg',
  '/src/logo.jpg',
  '/src/robot.png',
  '/sounds/bullet.mp3',
  '/sounds/enemyDestroy.mp3',
  '/sounds/game.mp3',
  '/sounds/gameOver.mp3',
  '/sounds/gameWin.mp3',
];

let URLS;

if (PROD_MODE) {
  URLS = urlsForProd;
} else {
  URLS = urlsForDev;
}

function timeout(delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(
        new Response('', {
          status: 408,
          statusText: 'Request timed out.',
        }),
      );
    }, delay);
  });
}

this.addEventListener('install', (event) => {
  console.log('install');
  this.skipWaiting();
  event
    .waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(URLS); //вернет важные данные в метод waitUntil (необходимые данные)
      }),
    )
    .catch((err) => console.log(err));
});

this.addEventListener('fetch', function (event) {
  const request = event.request;

  if (request.method === 'GET' && PROD_MODE) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return Promise.race([timeout(300), fetch(event.request)])
          .then(function (response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => {
            return caches.match(event.request).then(function (response) {
              if (response) {
                return response;
              }
            });
          });
      }),
    );
  } else {
    event.respondWith(fetch(request));
  }
});

this.addEventListener('activate', function (event) {
  console.log('activate');
  if (this.clients && clients.claim) {
    clients.claim();
  }
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name !== CACHE_NAME;
          })
          .map((name) => caches.delete(name)),
      );
    }),
  );
});

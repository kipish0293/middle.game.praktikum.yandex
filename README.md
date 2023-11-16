### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server
6. Выполните команду `yarn serv --scope=client` чтобы запустить сервер статики клиента (для разработки)

### Где взять файл postgres.env с переменными для подключения к БД?

1. Создайте сами в корне проекта рядом с docker-compose.yaml файл postgres.env
   внутри 2 переменные:
   POSTGRES_USER=admin
   POSTGRES_PASSWORD=1234
2. Для прода будет общий один файл о котором мы договоримся позднее.

### Как запустить docker приложения?

1. Сборка контейнера - docker build -f Dockerfile.server -t server .
2. Запуск контейнера - docker run -p 3000:3000 -d server
3. Посмотреть список запущенных контейнеров - docker ps
4. Остановка контейнера - docker stop -t 0 {ed22, это первые уникальные цифры контейнера из 3 пункта}
5. Удаление образа - docker rmi 1721c0(Где 1721c0 - идентификатор сервиса из docker ps)

### Как запустить docker-compose?

1. docker-compose build
2. docker-compose up (если не в фоне)
   2.1. docker-compose up -d (если в фоне)
3. если необходимо остановить процесс - Ctrl+C в терминале где он запущен (если не в фоне)
4. остановить один конкретный контейнер - docker-compose stop %service-name%
5. остановить все контейнеры - docker-compose stop
6. запуск конкретного контейнера - docker-compose start %service-name%
7. посмотреть запущенные контейнеры - docker-compose ps --services
8. удаление всех контейнеров - docker-compose down
9. удаление одного контейнера - docker-compose down %service-name%
10. Удаление образа - docker rmi 1721c0(Где 1721c0 - идентификатор сервиса из docker ps)

### Как запустить в режиме SSR в деве?

1. в папке packages/server запустите скрипт yarn dev

### Как запустить в режиме SSR в продакшен?

1. в папке packages/client запустите скрипт yarn build
2. в папке packages/server запустите скрипт yarn build
3. в папке packages/server запустите скрипт yarn previev

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## Документация по игровому движку

[Ссылка](packages/client/src/engine/README.md)

## Скринкаст для первого командного зачета

[Ссылка](https://www.youtube.com/watch?v=VK6FW-lDsPw)

## API Форума
Для доступа к api форума требуется, чтобы в заголоках запроса была кука авторизации.
  ### Thread
1. post /api/forum/thread  body: {title} - создаёт тему форума за авторством автора, возвращает созданнуют тему
2. get /api/forum/thread/ - возвращает все темы
3. delete /api/forum/:threadId - удаляет тему из БД
4. put /:threadId/edit - body: {title} изменяет заголовок темы
  ### Answer
1. get /api/forum/:threadId - возвращает все ответы в теме
2. post /api/forum/answer body: {'title', 'text', 'thread'} - создаёт ответ и возвращает созданный ответ
3. delete /api/forum/:answerId - удаляет ответ из БД
4. put /api/forum/:threadId/edit body: {text} изменяет текст ответа
  ### Comment
1. get /api/forum/comment/:answerId - массив комментов с детьми
2. post /api/forum/comment body: {'text', 'answer', 'parentComment'} создаёт коммент и возвращает его. По умолчанию parentComment - null, при обозначении parentComment - создаёт child коммент
3. delete /api/forum/:commentId - *не удаляет коммент*, а помечает его как deleted, чтобы не нарушать дерево комментов
4. put /api/forum/:threadId/edit body: {'text'} - изменяет текст коммента

ARG NODE_VERSION=18
ARG SERVER_PORT=3005
ENV ENV=development

FROM node:$NODE_VERSION-buster as base

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn lerna bootstrap

EXPOSE ${SERVER_PORT}

CMD [ "/bin/sh", "-c", "if [ \"$ENV\" = development ]; then exec yarn --cwd /app/packages/server; else exec node /app/packages/server/dist/index.js \"$@\"; fi" ]

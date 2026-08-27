FROM node:lts AS build

RUN npm install -g pnpm

WORKDIR /src

ADD . /src

ARG STAGE

RUN pnpm ci && pnpm run build:$STAGE

FROM nginx:1.31-alpine
ADD docker/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /src/build /usr/share/nginx/html

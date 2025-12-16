FROM node:19.6.0 AS build

WORKDIR /src


COPY client-checklist.ui/package.json ./client-checklist.ui/package.json
#COPY client-checklist.ui/package-lock.json ./client-checklist.ui/package-lock.json

WORKDIR /src/client-checklist.ui

RUN npm install

COPY client-checklist.ui ./

ARG STAGE
RUN npm run build:$STAGE

FROM nginx:1.27-alpine
ADD client-checklist.ui/docker/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /src/client-checklist.ui/build /usr/share/nginx/html

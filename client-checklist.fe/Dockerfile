FROM node:19.6.0 AS build

WORKDIR /src

ADD package.json package.json

RUN npm install

COPY . .

ARG STAGE
RUN npm run build:$STAGE

FROM nginx:1.27-alpine

COPY --from=build /src/dist /usr/share/nginx/html

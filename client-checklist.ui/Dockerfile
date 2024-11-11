FROM node:19.6.0 AS build

WORKDIR /src

ADD package.json package.json

RUN npm install

COPY . .

ARG STAGE
RUN npm run build:$STAGE

FROM nginx:1.27-alpine
ADD default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /src/build /usr/share/nginx/html

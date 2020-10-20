#TODO find a way to make npm build first
FROM node:10-alpine as build-step

RUN mkdir -p /app
WORKDIR ../ng-cams/app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/docs /usr/share/nginx/html


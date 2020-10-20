#TODO find a way to make npm build first
FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY ng-cams/package.json /app
RUN npm install
COPY ng-cams /app
RUN npm run build --base-href

FROM nginx:1.15-alpine
RUN rm /etc/nginx/conf.d/default.conf
ADD cams-docker/client/nginx_cams.conf /etc/nginx/conf.d/nginx.conf
COPY --from=build-step /app/dist/ng-cams /usr/share/nginx/html


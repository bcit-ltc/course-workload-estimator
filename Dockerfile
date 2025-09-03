FROM node:18-alpine3.18 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build


## Clean

FROM nginx:alpine AS cleaner

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist ./


## Release/production

FROM nginxinc/nginx-unprivileged AS release

LABEL maintainer courseproduction@bcit.ca

WORKDIR /usr/share/nginx/html

COPY --from=cleaner /usr/share/nginx/html/ ./

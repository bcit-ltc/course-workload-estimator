# Dockerfile
## Build
FROM node:24.6.0-alpine3.22 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . /app

RUN npm run build


## Clean
FROM nginx:alpine AS cleaner

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist ./


## Release
FROM nginxinc/nginx-unprivileged:alpine3.22-perl

LABEL maintainer = courseproduction@bcit.ca
LABEL org.opencontainers.image.source = "https://github.com/bcit-ltc/course-workload-estimator"

WORKDIR /usr/share/nginx/html

COPY --from=cleaner /usr/share/nginx/html/ ./

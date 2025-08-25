FROM node:24-slim AS builder

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

FROM nginxinc/nginx-unprivileged:alpine3.22 AS release

LABEL maintainer="courseproduction@bcit.ca"
LABEL org.opencontainers.image.description="A time calculator for instructors to estimate how many hours of work students might be expected to spend on a course."

WORKDIR /usr/share/nginx/html

COPY --from=cleaner /usr/share/nginx/html/ ./

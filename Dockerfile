FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Optional override for the API URL baked into the client:
#   docker build --build-arg VITE_SERVER_URL=http://host:3000/api/v1 .
ARG VITE_SERVER_URL=/api/v1
ENV VITE_SERVER_URL=$VITE_SERVER_URL

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN printf '%s\n' \
  'server {' \
  '    listen 80;' \
  '    server_name _;' \
  '    root /usr/share/nginx/html;' \
  '    include /etc/nginx/mime.types;' \
  '    gzip on;' \
  '    gzip_types text/plain text/css application/javascript application/json image/svg+xml;' \
  '    location / {' \
  '        try_files $uri $uri/ /index.html;' \
  '    }' \
  '}' \
  > /etc/nginx/conf.d/default.conf

EXPOSE 80

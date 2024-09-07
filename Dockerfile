# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app

ENV VITE_APP_ENV=production
ENV VITE_BACKEND_DOMAIN=api-andrii.juice.com
ENV VITE_BACKEND_PORT=8000

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
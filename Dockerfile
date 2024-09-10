# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app

ENV VITE_APP_ENV=production
ENV VITE_BACKEND_DOMAIN=https://api.libjuice.com

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
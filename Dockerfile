FROM node:alpine
WORKDIR /data
COPY . /data
RUN npm run build

FROM nginx:alpine
COPY --from=0 /data/public /usr/share/nginx/html

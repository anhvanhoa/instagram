FROM node:20.11.0-alpine3.18 AS development

WORKDIR /home/instagram

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

FROM development AS build

RUN yarn build

CMD ["yarn", "dev", "--host", "0.0.0.0"]

FROM nginx:1.23.3-alpine AS nginx

WORKDIR /usr/share/nginx/html

COPY --from=build /home/instagram/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /home/instagram/dist .

CMD ["nginx", "-g", "daemon off;"]

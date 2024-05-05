FROM node:20.11.0-alpine3.18 AS instagram-sever

WORKDIR /home/instagram-sever

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8008

CMD ["yarn", "start"]
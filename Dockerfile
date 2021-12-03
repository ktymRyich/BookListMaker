FROM node:17

ENV NODE_OPTIONS="--openssl-legacy-provider"

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "serve"]

FROM node:22.5.1-alpine

WORKDIR /app

COPY package*.json .

RUN yarn ci

COPY . .

EXPOSE 3000

CMD yarn start
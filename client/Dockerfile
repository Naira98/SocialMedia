FROM node:22.5.1-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn ci

COPY . .

EXPOSE 5173

CMD yarn run dev
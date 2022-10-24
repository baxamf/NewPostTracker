FROM node:latest

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

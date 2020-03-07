FROM node:10

#Create app directory
WORKDIR /usr/src/app

#Install dependencies
COPY package*.json ./

RUN npm Install

COPY . .

EXPOSE 8080

CMD [ "node", "server.js"]
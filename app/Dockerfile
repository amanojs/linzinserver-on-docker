FROM node:latest

WORKDIR /home/app

COPY ./app/package*.json ./

RUN npm install

COPY ./app ./

EXPOSE 23450
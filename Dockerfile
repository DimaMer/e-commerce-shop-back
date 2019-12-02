FROM node:12.10-alpine as builder
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
COPY package*.json ./
RUN npm install
WORKDIR /usr/src/app
COPY . .
EXPOSE 7000

CMD [ "npm", "start" ]

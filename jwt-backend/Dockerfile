# prepare environment for nodeJS - alpine decrease size of Nodejs
FROM node:14-alpine

WORKDIR /danglinh/jwt-backend

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

# copy all file in local & copy fine in workdir
COPY . .

RUN npm run build-src

CMD [ "npm","run","build" ]
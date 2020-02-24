FROM node:12

ENV port 3001

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#RUN npm run tsc

EXPOSE $port

CMD ["node", "dist/"]
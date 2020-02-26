FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#RUN npm run tsc

ENV PORT=3030
ENV REDIS_PORT=6379
ENV REDIS_HOST="redis"

CMD ["node", "dist/"]
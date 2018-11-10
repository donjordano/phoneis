FROM node:8

RUN mkdir /app
WORKDIR /app
RUN npm install pm2 -g
ADD package*.json /app/
RUN npm install
ADD ./src /app

CMD ["npm", "run", "start-prod"]
FROM node:18

WORKDIR /home/app

COPY . .

RUN npm i

EXPOSE 3001

CMD [ "node","index.js" ]

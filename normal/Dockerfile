FROM node:latest

WORKDIR /home/node/app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn prisma generate

CMD [ "yarn", "watch" ]

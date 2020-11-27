FROM node:lts

ENV NODE_ENV=production

RUN mkdir -p /server
RUN mkdir -p /server/uploads

WORKDIR /server

COPY ["package.json",  "package-lock.json", "./"]

RUN npm install --production

COPY ./build .

CMD [ "node", "index.js"]
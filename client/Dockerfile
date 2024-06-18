FROM node:16.15.1

WORKDIR /TPK/client/

COPY package*.json /TPK/client/
RUN npm install

COPY . /TPK/client/

CMD ["npm", "start"]
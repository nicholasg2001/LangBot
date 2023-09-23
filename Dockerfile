FROM node:18

WORKDIR /LangBot

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
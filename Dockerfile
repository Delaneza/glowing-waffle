FROM node:20.11.1-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

EXPOSE 9000

CMD ["npm", "run", "start"]

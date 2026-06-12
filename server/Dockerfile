FROM node:25-alpine
WORKDIR /server
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN ls dist/workers/
EXPOSE 3000

CMD ["npm", "start"]
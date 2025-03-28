# frontend/Dockerfile
FROM node:18
WORKDIR /src
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm", "start"]
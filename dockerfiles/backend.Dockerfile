FROM node:latest

WORKDIR /app

COPY backend/package.json ./

RUN npm install

COPY backend .
# COPY backend/.env .

EXPOSE 8001

CMD ["npm", "start"]

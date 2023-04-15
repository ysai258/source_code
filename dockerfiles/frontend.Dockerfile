FROM node:latest

WORKDIR /app

COPY frontend/package.json ./

RUN npm install

RUN npm install serve -g
COPY frontend .

EXPOSE 3000
CMD ["serve", "build 3000 --spa"]
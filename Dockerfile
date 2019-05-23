FROM node:alpine
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build
EXPOSE 3001
CMD node ./dist/main.js

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx ionic build
RUN npx cap sync android
EXPOSE 8100
CMD [ "npx", "ionic", "serve" ]
FROM node:latest
WORKDIR /src/app
COPY package*.json ./
RUN npm install -g @ionic/cli
RUN npm install
COPY . .
RUN npx ionic build
RUN npx cap sync android
CMD [ "npx", "ionic", "serve" ]
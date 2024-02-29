FROM node:21-alpine
WORKDIR /src/app
COPY package*.json ./
RUN npm install -g @ionic/cli --ignore-scripts
RUN npm install --ignore-scripts
COPY . .
RUN npx ionic build
RUN npx cap sync android
CMD [ "npx", "ionic", "serve" ]
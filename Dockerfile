FROM node:latest
WORKDIR /src/app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN npx ionic build
RUN npx cap sync android
EXPOSE 8101
CMD [ "ng", "run", "app:serve", "--host=0.0.0.0", "--port=8101" ]
FROM node:21-alpine

# Create app directory
WORKDIR /usr/src/app

# Create a new user "appuser"
RUN adduser --disabled-password --gecos '' appuser

# Switch to the new user
USER appuser

# Install app dependencies
COPY package*.json ./

# Temporarily switch to root to install global packages
USER root
RUN npm install --ignore-scripts -g @ionic/cli
RUN npm install --ignore-scripts

COPY . .
RUN npx ionic build
RUN npx cap sync android

RUN chown -R appuser:appuser /usr/src/app
USER appuser

# Start the app
EXPOSE 8101
CMD [ "npx", "ionic", "serve", "--host=0.0.0.0" ]
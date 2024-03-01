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

# Copy app source
COPY src /usr/src/app/src
COPY package*.json /usr/src/app/
COPY ionic.config.json /usr/src/app/
COPY angular.json /usr/src/app/
COPY tsconfig*.json /usr/src/app/

# Copy the src directory
RUN npx ionic build
RUN npx cap sync android

# Switch back to the new user
RUN chown -R appuser:appuser /usr/src/app
USER appuser

# Start the app
CMD [ "npx", "ionic", "serve", "--host=0.0.0.0" ]
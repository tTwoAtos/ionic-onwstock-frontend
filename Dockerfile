FROM node:21-alpine
# Create app directory
WORKDIR /src/app

# Create a new user "appuser"
RUN adduser --disabled-password --gecos '' appuser

# Switch to the new user
USER appuser

# Install app dependencies
COPY package*.json ./
RUN npm install --ignore-scripts -g @ionic/cli
RUN npm install --ignore-scripts

# Bundle app source
COPY --chown=appuser:appuser ionic.config.json ./
COPY src ./src
RUN npx ionic build
RUN npx cap sync android

# Start the app
EXPOSE 8101
CMD [ "npx", "ionic", "serve" ]
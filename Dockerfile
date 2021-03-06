# Use Minimal Node.js built on Alpine Linux
FROM mhart/alpine-node:12

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY ./src ./src

# Service must listen to $PORT environment variable.
# This default value facilitates local development.
ENV PORT 80
EXPOSE $PORT

# Run the web service on container startup.
CMD [ "npm", "run", "start:prod" ]

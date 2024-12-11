# Use Node.js LTS version as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the application port
EXPOSE 5000

# Define the command to run your application
CMD ["node", "build/server.js"]

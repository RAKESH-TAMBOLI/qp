# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally for build
RUN npm install -g typescript

# Compile TypeScript files
RUN npm run build

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "build/server.js"]

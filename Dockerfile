# Use a base Node.js image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["node", "build/server.js"]

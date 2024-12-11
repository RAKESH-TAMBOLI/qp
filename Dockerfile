# Use a specific Node.js version for consistency
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the TypeScript code into JavaScript
RUN npm run build

# Set environment variable (optional, if required)
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "build/server.js"]

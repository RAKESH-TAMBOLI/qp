# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Compile TypeScript to JavaScript (if your project uses TypeScript)
RUN npm run build

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]

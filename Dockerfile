# Use a base image with a compatible Node.js version
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json /app/
COPY package-lock.json /app/ # Include if available

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . /app

# Build the TypeScript files
RUN npm run build

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]

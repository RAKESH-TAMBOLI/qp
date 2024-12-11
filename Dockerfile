# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json first
# This helps leverage Docker cache to avoid re-running npm install every time
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on (if needed)
EXPOSE 5000

# Run the application
CMD ["npm", "start"]

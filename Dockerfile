# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json (if available) first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]

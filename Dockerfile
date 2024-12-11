# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory for the app
WORKDIR /app

# Copy package.json to the container (without package-lock.json)
COPY package.json ./

# Install dependencies without the package-lock.json file
RUN npm install --legacy-peer-deps

# Copy the rest of the application code into the container
COPY . .

# Expose port 5000 (or any port your app is running on)
EXPOSE 5000

# Start the app when the container is run
CMD ["npm", "start"]

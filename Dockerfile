# Step 1: Use Node.js base image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project to the container
COPY . .

# Step 6: Compile TypeScript to JavaScript
RUN npm run build

# Step 7: Expose the application port
EXPOSE 5000

# Step 8: Command to start the application
CMD ["npm", "start"]

# Use the official Node.js base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the rest of the code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the app
CMD ["npm", "run", "dev"]

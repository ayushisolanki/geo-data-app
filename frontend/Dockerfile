# Stage 1: Build the application
# Use Node.js LTS version as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# For development, use the Vue CLI service to enable hot-reloading
CMD ["npm", "run", "serve"]

# Expose the port that the Vue dev server will run on
EXPOSE 8080

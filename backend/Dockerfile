# Use the official Node.js image as a base
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Install nodemon globally if not in dev dependencies
RUN npm install -g nodemon

# Run the app with nodemon using the defined script
CMD ["npm", "run", "dev"]
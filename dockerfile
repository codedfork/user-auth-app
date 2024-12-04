# Use Node.js official image from DockerHub
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Run tests before starting the app (optional)
# RUN npm test  # This will run the tests during the image build process

# Copy the application source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD [ "npm", "start" ]

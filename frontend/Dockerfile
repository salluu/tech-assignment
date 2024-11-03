# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port (make sure it matches your frontend port, e.g., 3001)
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]

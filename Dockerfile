# Define base image
FROM node:18-slim AS base

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
FROM base AS deps
COPY package*.json ./
RUN npm install --only=production

# Copy app source code
FROM base AS build
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Run as a non-root user for security
RUN useradd -m appuser
USER appuser

# Start the app
CMD ["npm", "run", "start"]
# Define base image
FROM node:18-alpine AS base

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

# Create non-root user
RUN addgroup -S appgroup 
RUN adduser -S appuser -G appgroup
USER appuser

# Expose the port your app runs on
ENV APP_PORT=8080
EXPOSE 8080

# Start the app
CMD ["npm", "run", "start"]
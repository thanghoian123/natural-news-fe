FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy only package files first to leverage Docker layer caching
COPY package*.json ./

# Optional: Clear npm cache (especially useful in CI/CD)
RUN npm cache clean --force

# Install dependencies
RUN rm -rf node_modules package-lock.json && npm install --legacy-peer-deps

# Copy the rest of the app after deps are installed
COPY . .

# Expose the port
EXPOSE 8000

# Run the app
CMD ["npm", "run", "dev", "--", "--port", "8000", "--host", "0.0.0.0"]

# ----------- Stage 1: Build Dependencies -----------
FROM node:18-slim as builder

WORKDIR /app

# Copy only package files and install dependencies
COPY package*.json ./

# Install only production dependencies (omit devDependencies)
RUN npm ci --omit=dev

# Copy app source code
COPY . .

# ----------- Stage 2: Runtime Image -----------
FROM node:18-slim

WORKDIR /app

# Puppeteer requires additional libraries (Headless Chromium deps)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy only built app and dependencies from builder stage
COPY --from=builder /app /app

# Expose app port
EXPOSE 5000

# Use production start script (no nodemon)
CMD ["node", "app.js"]

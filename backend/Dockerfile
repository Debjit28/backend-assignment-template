FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package descriptors 
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 4000

# Default command
CMD ["npm", "start"]
